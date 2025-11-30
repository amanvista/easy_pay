import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Package, User, CheckCircle } from "lucide-react";
import riderIcon from "./rider.png";

// Add pulse animation styles
const styles = `
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      opacity: 0.6;
    }
    50% {
      transform: scale(1.2);
      opacity: 0.3;
    }
  }
`;

const TrackRiderPage = () => {
  // Inject styles
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);
  const { orderId = "ORD123456" } = useParams();
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const googleMapRef = useRef(null);
  const riderMarkerRef = useRef(null);
  const routePolylineRef = useRef(null);
  const directionsRendererRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [riderLocation, setRiderLocation] = useState({ lat: 28.6129, lng: 77.2295 });
  const [hasArrived, setHasArrived] = useState(false);
  const [routePoints, setRoutePoints] = useState([]);
  const [heading, setHeading] = useState(0);
  const animationRef = useRef(null);

  // Calculate bearing between two points
  const calculateBearing = (start, end) => {
    const startLat = (start.lat * Math.PI) / 180;
    const startLng = (start.lng * Math.PI) / 180;
    const endLat = (end.lat * Math.PI) / 180;
    const endLng = (end.lng * Math.PI) / 180;

    const dLng = endLng - startLng;

    const y = Math.sin(dLng) * Math.cos(endLat);
    const x =
      Math.cos(startLat) * Math.sin(endLat) -
      Math.sin(startLat) * Math.cos(endLat) * Math.cos(dLng);

    const bearing = Math.atan2(y, x);
    return ((bearing * 180) / Math.PI + 360) % 360;
  };

  // Mock data
  const mockData = {
    rider: {
      name: "Rajesh Kumar",
      phone: "+91 98765 43210",
    },
    pickup: {
      name: "Restaurant Name",
      address: "123 Main Street, Delhi",
      location: { lat: 28.6129, lng: 77.2295 },
    },
    destination: {
      name: "Your Location",
      address: "456 Park Avenue, Delhi",
      location: { lat: 28.6149, lng: 77.2085 },
    },
  };

  // Extract points from directions route for animation
  const extractRoutePoints = (route, numPoints = 50) => {
    const path = route.overview_path;
    const points = [];
    
    // Sample points along the route
    const totalPoints = path.length;
    const step = Math.max(1, Math.floor(totalPoints / numPoints));
    
    for (let i = 0; i < totalPoints; i += step) {
      points.push({
        lat: path[i].lat(),
        lng: path[i].lng(),
      });
    }
    
    // Always include the last point
    if (points.length > 0) {
      const lastPoint = path[totalPoints - 1];
      points.push({
        lat: lastPoint.lat(),
        lng: lastPoint.lng(),
      });
    }
    
    return points;
  };

  useEffect(() => {
    // Load Google Maps script
    const loadGoogleMaps = () => {
      if (window.google && window.google.maps) {
        setMapLoaded(true);
        return;
      }

      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
      if (!apiKey) {
        console.error("Google Maps API key not found in environment variables");
        return;
      }

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=geometry`;
      script.async = true;
      script.defer = true;
      script.onload = () => setMapLoaded(true);
      script.onerror = () => {
        console.error("Failed to load Google Maps script");
      };
      document.head.appendChild(script);
    };

    loadGoogleMaps();
  }, []);

  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return;

    const { pickup, destination } = mockData;

    // Initialize map
    const map = new window.google.maps.Map(mapRef.current, {
      zoom: 14,
      center: pickup.location,
      disableDefaultUI: true,
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
      gestureHandling: "none",
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }],
        },
      ],
    });

    googleMapRef.current = map;

    // Create custom rider icon with image (will be updated with rotation)
    const createRiderIcon = (rotation = 0) => ({
      url: riderIcon,
      scaledSize: new window.google.maps.Size(50, 50),
      anchor: new window.google.maps.Point(25, 25),
      rotation: rotation,
    });

    // Create custom pickup icon
    const pickupIcon = {
      path: window.google.maps.SymbolPath.CIRCLE,
      scale: 10,
      fillColor: "#4CAF50",
      fillOpacity: 1,
      strokeColor: "#FFFFFF",
      strokeWeight: 2,
    };

    // Create custom destination icon
    const destinationIcon = {
      path: window.google.maps.SymbolPath.CIRCLE,
      scale: 10,
      fillColor: "#2196F3",
      fillOpacity: 1,
      strokeColor: "#FFFFFF",
      strokeWeight: 2,
    };

    // Create a custom overlay for the glow effect
    class GlowMarker extends window.google.maps.OverlayView {
      constructor(position, map) {
        super();
        this.position = position;
        this.div = null;
        this.setMap(map);
      }

      onAdd() {
        const div = document.createElement("div");
        div.style.position = "absolute";
        div.style.width = "70px";
        div.style.height = "70px";
        div.style.borderRadius = "50%";
        div.style.background = "radial-gradient(circle, rgba(255,107,53,0.4) 0%, rgba(255,107,53,0) 70%)";
        div.style.animation = "pulse 2s ease-in-out infinite";
        div.style.pointerEvents = "none";
        this.div = div;

        const panes = this.getPanes();
        panes.overlayLayer.appendChild(div);
      }

      draw() {
        const overlayProjection = this.getProjection();
        const position = overlayProjection.fromLatLngToDivPixel(
          new window.google.maps.LatLng(this.position.lat, this.position.lng)
        );

        if (this.div) {
          this.div.style.left = position.x - 35 + "px";
          this.div.style.top = position.y - 35 + "px";
        }
      }

      updatePosition(newPosition) {
        this.position = newPosition;
        this.draw();
      }

      onRemove() {
        if (this.div) {
          this.div.parentNode.removeChild(this.div);
          this.div = null;
        }
      }
    }

    // Add glow effect
    const glowOverlay = new GlowMarker(riderLocation, map);
    
    // Add rider marker
    const riderMarker = new window.google.maps.Marker({
      position: riderLocation,
      map: map,
      icon: createRiderIcon(0),
      title: "Rider Location",
      zIndex: 1000,
    });
    riderMarkerRef.current = { marker: riderMarker, glow: glowOverlay, createIcon: createRiderIcon };

    // Add pickup marker
    new window.google.maps.Marker({
      position: pickup.location,
      map: map,
      icon: pickupIcon,
      title: "Pickup Location",
    });

    // Add destination marker
    new window.google.maps.Marker({
      position: destination.location,
      map: map,
      icon: destinationIcon,
      title: "Delivery Location",
    });

    // Create DirectionsService and DirectionsRenderer
    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer({
      map: map,
      suppressMarkers: true, // We're using custom markers
      polylineOptions: {
        strokeColor: "#2196F3",
        strokeOpacity: 0.8,
        strokeWeight: 5,
      },
    });
    directionsRendererRef.current = directionsRenderer;

    // Request directions
    directionsService.route(
      {
        origin: pickup.location,
        destination: destination.location,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          // Display the route
          directionsRenderer.setDirections(result);

          // Extract route points for animation
          const route = result.routes[0];
          const points = extractRoutePoints(route, 50);
          setRoutePoints(points);

          // Fit map to show the route with responsive padding
          const bounds = new window.google.maps.LatLngBounds();
          route.overview_path.forEach((point) => {
            bounds.extend(point);
          });
          
          // Responsive padding based on screen size
          const isMobile = window.innerWidth < 768;
          map.fitBounds(bounds, {
            top: isMobile ? 80 : 100,
            right: isMobile ? 20 : 50,
            bottom: isMobile ? 280 : 200,
            left: isMobile ? 20 : 50,
          });
        } else {
          console.error("Directions request failed:", status);
        }
      }
    );

    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [mapLoaded]);

  // Animate rider along the route
  useEffect(() => {
    if (routePoints.length === 0) return;

    let currentPointIndex = 0;

    const animateRider = () => {
      if (currentPointIndex < routePoints.length) {
        const newLocation = routePoints[currentPointIndex];
        
        // Calculate heading if there's a next point
        if (currentPointIndex < routePoints.length - 1) {
          const nextLocation = routePoints[currentPointIndex + 1];
          const newHeading = calculateBearing(newLocation, nextLocation);
          setHeading(newHeading);
        }
        
        setRiderLocation(newLocation);
        currentPointIndex++;
        animationRef.current = setTimeout(animateRider, 1000);
      } else {
        // Rider has arrived
        setHasArrived(true);
      }
    };

    // Start animation after 1 second
    setTimeout(animateRider, 1000);

    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [routePoints]);

  // Update rider marker position and rotation when riderLocation or heading changes
  useEffect(() => {
    if (riderMarkerRef.current) {
      riderMarkerRef.current.marker.setPosition(riderLocation);
      riderMarkerRef.current.marker.setIcon(riderMarkerRef.current.createIcon(heading));
      riderMarkerRef.current.glow.updatePosition(riderLocation);
    }
  }, [riderLocation, heading]);

  return (
    <div className="fixed inset-0 flex flex-col bg-gray-50 overflow-hidden z-50">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 py-3 flex items-center gap-3 flex-shrink-0">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-full transition"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Track Rider</h1>
          <p className="text-sm text-gray-500">Order #{orderId}</p>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative overflow-hidden">
        <div ref={mapRef} className="w-full h-full" />

        {/* Loading overlay */}
        {!mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading map...</p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Info Card */}
      <div className="bg-white shadow-lg rounded-t-3xl p-4 md:p-6 space-y-3 md:space-y-4 flex-shrink-0 max-h-[45vh] overflow-y-auto">
        {/* Arrival Message */}
        {hasArrived && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 md:p-4 mb-2 md:mb-4 flex items-center gap-3">
            <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-600 flex-shrink-0" />
            <div>
              <p className="font-semibold text-sm md:text-base text-green-900">Captain has arrived!</p>
              <p className="text-xs md:text-sm text-green-700">Your order is ready for delivery</p>
            </div>
          </div>
        )}

        {/* Rider Info */}
        <div className="flex items-center gap-3 md:gap-4 pb-3 md:pb-4 border-b border-gray-200">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-5 h-5 md:w-6 md:h-6 text-orange-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm md:text-base text-gray-900 truncate">{mockData.rider.name}</h3>
            <p className="text-xs md:text-sm text-gray-500">Delivery Partner</p>
          </div>
          <a
            href={`tel:${mockData.rider.phone}`}
            className="px-3 md:px-4 py-2 bg-orange-500 text-white rounded-lg text-xs md:text-sm font-medium hover:bg-orange-600 transition flex-shrink-0"
          >
            Call
          </a>
        </div>

        {/* Location Info */}
        <div className="space-y-2 md:space-y-3">
          <div className="flex items-start gap-2 md:gap-3">
            <div className="w-7 h-7 md:w-8 md:h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Package className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs md:text-sm font-medium text-gray-900 truncate">{mockData.pickup.name}</p>
              <p className="text-xs text-gray-500 line-clamp-1">{mockData.pickup.address}</p>
            </div>
          </div>

          <div className="flex items-start gap-2 md:gap-3">
            <div className="w-7 h-7 md:w-8 md:h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs md:text-sm font-medium text-gray-900 truncate">{mockData.destination.name}</p>
              <p className="text-xs text-gray-500 line-clamp-1">{mockData.destination.address}</p>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="pt-3 md:pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-xs md:text-sm text-gray-600">
              {hasArrived ? "Status" : "Estimated Arrival"}
            </span>
            <span className={`text-xs md:text-sm font-semibold ${hasArrived ? "text-green-600" : "text-orange-600"}`}>
              {hasArrived ? "Arrived" : "15-20 mins"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackRiderPage;
