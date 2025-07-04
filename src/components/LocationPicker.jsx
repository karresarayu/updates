
import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";

const LocationPicker = ({ onLocationChange, initialLocation }) => {
  const mapRef = useRef(null);
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const [address, setAddress] = useState("");

  // Mock function to simulate reverse geocoding
  const getAddressFromCoords = (lat, lng) => {
    const areas = [
      "Banjara Hills", "Jubilee Hills", "Gachibowli", "Kondapur", "Madhapur",
      "Hitech City", "Secunderabad", "Begumpet", "Ameerpet", "Kukatpally"
    ];
    const randomArea = areas[Math.floor(Math.random() * areas.length)];
    return `Near ${randomArea}, Hyderabad, Telangana`;
  };

  const handleMapClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Convert click coordinates to lat/lng (simplified calculation)
    const lat = initialLocation.lat + (rect.height / 2 - y) * 0.001;
    const lng = initialLocation.lng + (x - rect.width / 2) * 0.001;
    
    const newLocation = { lat, lng };
    const newAddress = getAddressFromCoords(lat, lng);
    
    setSelectedLocation(newLocation);
    setAddress(newAddress);
    onLocationChange(newLocation, newAddress);
  };

  useEffect(() => {
    // Initialize with default address
    const defaultAddress = getAddressFromCoords(initialLocation.lat, initialLocation.lng);
    setAddress(defaultAddress);
    onLocationChange(initialLocation, defaultAddress);
  }, []);

  return (
    <div className="space-y-2">
      <div 
        ref={mapRef}
        className="w-full h-64 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg border-2 border-dashed border-gray-300 cursor-crosshair relative overflow-hidden"
        onClick={handleMapClick}
      >
        {/* Mock map background */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-8 grid-rows-6 h-full">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="border border-gray-200"></div>
            ))}
          </div>
        </div>
        
        {/* Location marker */}
        <div 
          className="absolute transform -translate-x-1/2 -translate-y-full"
          style={{
            left: `${50 + (selectedLocation.lng - initialLocation.lng) * 1000}%`,
            top: `${50 - (selectedLocation.lat - initialLocation.lat) * 1000}%`
          }}
        >
          <MapPin className="w-8 h-8 text-red-500 drop-shadow-lg" fill="currentColor" />
        </div>
        
        {/* Instructions overlay */}
        <div className="absolute bottom-2 left-2 right-2 bg-white/90 rounded p-2 text-xs text-center">
          Click anywhere on the map to mark the issue location
        </div>
      </div>
      
      {address && (
        <div className="text-sm text-gray-600">
          <strong>Selected Location:</strong> {address}
        </div>
      )}
    </div>
  );
};

export default LocationPicker;
