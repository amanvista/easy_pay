import React, { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Autocomplete } from '@react-google-maps/api';
import { keys } from './keys';

const containerStyle = {
  width: '400px',
  height: '400px',
};

const defaultCenter = {
  lat: -3.745,
  lng: -38.523,
};

function Map() {
  const [map, setMap] = useState(null);
  const [clickedLatLng, setClickedLatLng] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(defaultCenter);
  const [autocomplete, setAutocomplete] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState('');
  const inputRef = useRef();

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: keys?.map,
    libraries: ['places'],
  });

  // Fetch current location when map loads
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newPosition = { lat: latitude, lng: longitude };
          setCurrentPosition(newPosition);
          setClickedLatLng(newPosition);
          if (map) map.panTo(newPosition);

          // Get address for current location
          fetchAddress(newPosition.lat, newPosition.lng);
        },
        (error) => console.warn('Error fetching location: ', error.message),
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    }
  }, [map]);

  // Reverse geocode to get address text from lat/lng
  const fetchAddress = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${keys?.map}`
      );
      const data = await response.json();
      if (data.results?.[0]) {
        setSelectedAddress(data.results[0].formatted_address);
      } else {
        setSelectedAddress('Address not found.');
      }
    } catch (e) {
      console.error('Error fetching address:', e);
      setSelectedAddress('Failed to fetch address.');
    }
  };

  const onUnmount = useCallback(() => setMap(null), []);

  const handleMapClick = useCallback((event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const newCoords = { lat, lng };
    setClickedLatLng(newCoords);
    fetchAddress(lat, lng);
  }, []);

  const handleRecenter = useCallback(() => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newPosition = { lat: latitude, lng: longitude };
        map?.panTo(newPosition);
        setClickedLatLng(newPosition);
        fetchAddress(latitude, longitude);
      },
      (error) => alert('Error getting your location: ' + error.message),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  }, [map]);

  const onLoadAutocomplete = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        map?.panTo(location);
        setClickedLatLng(location);
        setSelectedAddress(place.formatted_address || place.name);
        inputRef.current.value = place.formatted_address || place.name;
      } else {
        alert('No details available for input: ' + place.name);
      }
    }
  };

  // Disable map/satellite and street view controls
  const mapOptions = {
    streetViewControl: false,
    mapTypeControl: false,  
    rotateControl: false,
    tiltControl: false,
    clickableIcons: false, // disables clicking POIs (no View on Google Maps)
    styles: [
      {
        featureType: 'poi',
        elementType: 'labels.icon',
        stylers: [{ visibility: 'on' }], // hides place icons and prevents popups
      },
    ],
  };

  return isLoaded ? (
    <div style={{ padding: '1rem' }}>
      <button onClick={handleRecenter} style={{ marginBottom: '1rem' }}>
        Go to my location
      </button>

      <Autocomplete onLoad={onLoadAutocomplete} onPlaceChanged={onPlaceChanged}>
        <input
          type="text"
          placeholder="Search a place"
          ref={inputRef}
          style={{
            boxSizing: 'border-box',
            border: '1px solid transparent',
            width: '240px',
            height: '32px',
            padding: '0 12px',
            borderRadius: '3px',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
            fontSize: '14px',
            outline: 'none',
            textOverflow: 'ellipses',
            marginBottom: '10px',
          }}
        />
      </Autocomplete>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentPosition}
        zoom={14}
        onLoad={setMap}
        onUnmount={onUnmount}
        onClick={handleMapClick}
        options={mapOptions}
      >
        {clickedLatLng && <Marker position={clickedLatLng} />}
      </GoogleMap>

      {clickedLatLng && (
        <div style={{ marginTop: '1rem' }}>
          <p>Latitude: {clickedLatLng.lat}, Longitude: {clickedLatLng.lng}</p>
          <p>Address: {selectedAddress}</p>
          <p style={{ color: 'green', fontWeight: 'bold' }}>Your location is selected.</p>
        </div>
      )}
    </div>
  ) : (
    <p>Loading Map...</p>
  );
}

export default Map;
