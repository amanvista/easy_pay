import { useState, useCallback, useRef, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker, Autocomplete } from "@react-google-maps/api";
import { MapPin, Navigation, Search } from "lucide-react";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: 28.6139, // Delhi
  lng: 77.209,
};

const libraries = ["places"];

const LocationPicker = ({ initialLocation, onLocationSelect }) => {
  const [markerPosition, setMarkerPosition] = useState(initialLocation || null);
  const [mapCenter, setMapCenter] = useState(initialLocation || defaultCenter);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [autocomplete, setAutocomplete] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [isLocked, setIsLocked] = useState(!!initialLocation); // Lock if there's an initial location
  const mapRef = useRef(null);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries,
  });

  // Load current location on mount if no initial location
  useEffect(() => {
    if (!initialLocation && navigator.geolocation) {
      const timeoutId = setTimeout(() => {
        setIsGettingLocation(false);
      }, 10000);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          clearTimeout(timeoutId);
          const newPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setMarkerPosition(newPosition);
          setMapCenter(newPosition);
          onLocationSelect(newPosition);
          setIsGettingLocation(false);
        },
        (error) => {
          clearTimeout(timeoutId);
          console.error("Error getting location:", error);
          setIsGettingLocation(false);
        },
        {
          enableHighAccuracy: false,
          timeout: 8000,
          maximumAge: 60000,
        }
      );
    }
  }, [initialLocation, onLocationSelect]);

  // Update map center when initial location changes
  useEffect(() => {
    if (initialLocation) {
      setMapCenter(initialLocation);
      setMarkerPosition(initialLocation);
    }
  }, [initialLocation]);

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const onMapClick = useCallback(
    (e) => {
      if (isLocked) return; // Don't allow clicks when locked
      
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      const newPosition = { lat, lng };
      setMarkerPosition(newPosition);
      onLocationSelect(newPosition);
      
      // Optional: Get address from coordinates (reverse geocoding)
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: newPosition }, (results, status) => {
        if (status === "OK" && results[0]) {
          setSearchValue(results[0].formatted_address);
        }
      });
    },
    [onLocationSelect, isLocked]
  );

  const handleUseCurrentLocation = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (navigator.geolocation) {
      setIsGettingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setMarkerPosition(newPosition);
          setMapCenter(newPosition);
          onLocationSelect(newPosition);
          setIsGettingLocation(false);
          setIsLocked(false); // Unlock after getting location

          // Pan map to new location
          if (mapRef.current) {
            mapRef.current.panTo(newPosition);
            mapRef.current.setZoom(15);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to get your location. Please check browser permissions.");
          setIsGettingLocation(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  // Handle autocomplete load
  const onAutocompleteLoad = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  // Handle place selection from search
  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      
      if (place.geometry && place.geometry.location) {
        const newPosition = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        
        setMarkerPosition(newPosition);
        setMapCenter(newPosition);
        onLocationSelect(newPosition);
        setSearchValue(place.formatted_address || place.name || "");
        setIsLocked(false); // Unlock after search

        // Pan and zoom to the selected place
        if (mapRef.current) {
          mapRef.current.panTo(newPosition);
          mapRef.current.setZoom(17);
        }
      }
    }
  };

  if (loadError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        Error loading maps. Please check your API key.
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mb-2"></div>
        <p className="text-gray-600">Loading map...</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Locked State Banner */}
      {isLocked && markerPosition && (
        <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">Location Set</p>
              <p className="text-xs text-gray-600">Click "Edit Location" to change the pin location</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsLocked(false)}
            className="px-5 py-2 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600 transition-colors shadow-sm"
          >
            Edit Location
          </button>
        </div>
      )}

      {/* Search Bar */}
      {!isLocked && (
        <div className="relative">
          <Autocomplete
            onLoad={onAutocompleteLoad}
            onPlaceChanged={onPlaceChanged}
            options={{
              componentRestrictions: { country: "in" }, // Restrict to India, change as needed
            }}
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for a location..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-gray-700"
              />
            </div>
          </Autocomplete>
        </div>
      )}

      {/* Action Buttons */}
      {!isLocked && (
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button
            type="button"
            onClick={handleUseCurrentLocation}
            disabled={isGettingLocation}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Navigation className="w-4 h-4" />
            {isGettingLocation ? "Getting..." : "Use Current Location"}
          </button>
          <div className="flex items-center gap-2 text-sm text-gray-600 px-2">
            <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0" />
            <span className="text-xs sm:text-sm">Or click on the map</span>
          </div>
        </div>
      )}

      {/* Map */}
      <div className={`rounded-lg overflow-hidden border-2 shadow-sm relative ${isLocked ? 'border-gray-300' : 'border-gray-200'}`}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={mapCenter}
          zoom={15}
          onLoad={onMapLoad}
          onClick={onMapClick}
          options={{
            zoomControl: !isLocked,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: !isLocked,
            gestureHandling: isLocked ? "none" : "greedy",
            draggable: !isLocked,
            scrollwheel: !isLocked,
            disableDoubleClickZoom: isLocked,
          }}
        >
          {markerPosition && (
            <Marker 
              position={markerPosition} 
              draggable={!isLocked} 
              onDragEnd={onMapClick}
            />
          )}
        </GoogleMap>
      </div>

      {markerPosition && (
        <div className={`border rounded-lg p-3 ${isLocked ? 'bg-blue-50 border-blue-200' : 'bg-orange-50 border-orange-200'}`}>
          <p className="text-sm font-medium text-gray-700 mb-1">
            {isLocked ? '📍 Current Location:' : '📍 Selected Location:'}
          </p>
          <p className="text-xs text-gray-600 font-mono">
            Lat: {Number(markerPosition.lat).toFixed(6)}, Lng: {Number(markerPosition.lng).toFixed(6)}
          </p>
          {searchValue && (
            <p className="text-xs text-gray-600 mt-1">{searchValue}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationPicker;
