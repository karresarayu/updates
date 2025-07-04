
import { useState } from "react";
import { MapPin, Eye } from "lucide-react";

const GrievanceMap = ({ grievances }) => {
  const [selectedGrievance, setSelectedGrievance] = useState(null);
  const [viewMode, setViewMode] = useState("status");

  const getMarkerColor = (grievance) => {
    if (viewMode === "status") {
      switch (grievance.status) {
        case "submitted": return "text-blue-500";
        case "in-progress": return "text-yellow-500";
        case "resolved": return "text-green-500";
        case "rejected": return "text-red-500";
        default: return "text-gray-500";
      }
    } else {
      switch (grievance.priority) {
        case "high": return "text-red-500";
        case "medium": return "text-yellow-500";
        case "low": return "text-green-500";
        default: return "text-gray-500";
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "submitted": return "bg-blue-100 text-blue-800";
      case "in-progress": return "bg-yellow-100 text-yellow-800";
      case "resolved": return "bg-green-100 text-green-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Calculate relative positions for markers (mock positioning)
  const getMarkerPosition = (grievance, index) => {
    const baseX = 50; // Center X
    const baseY = 50; // Center Y
    const spread = 25; // How spread out the markers are
    
    // Use a simple algorithm to spread markers around the center
    const angle = (index * 360) / grievances.length;
    const radius = Math.min(spread, spread * (index + 1) / grievances.length);
    
    const x = baseX + radius * Math.cos(angle * Math.PI / 180);
    const y = baseY + radius * Math.sin(angle * Math.PI / 180);
    
    return {
      left: `${Math.max(5, Math.min(95, x))}%`,
      top: `${Math.max(5, Math.min(95, y))}%`
    };
  };

  return (
    <div className="space-y-4">
      {/* View Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("status")}
            className={`px-3 py-1 text-sm rounded ${viewMode === "status" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-600"}`}
          >
            By Status
          </button>
          <button
            onClick={() => setViewMode("priority")}
            className={`px-3 py-1 text-sm rounded ${viewMode === "priority" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-600"}`}
          >
            By Priority
          </button>
        </div>
        <div className="flex items-center text-xs text-gray-500">
          <Eye className="w-3 h-3 mr-1" />
          {grievances.length} issues
        </div>
      </div>

      {/* Map Container */}
      <div className="relative w-full h-64 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border overflow-hidden">
        {/* Mock map grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-6 grid-rows-4 h-full">
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className="border border-gray-300"></div>
            ))}
          </div>
        </div>

        {/* City landmarks (mock) */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-gray-400 rounded"></div>
          <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-gray-400 rounded"></div>
          <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-gray-400 rounded"></div>
        </div>

        {/* Grievance markers */}
        {grievances.map((grievance, index) => (
          <div
            key={grievance.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform"
            style={getMarkerPosition(grievance, index)}
            onClick={() => setSelectedGrievance(selectedGrievance?.id === grievance.id ? null : grievance)}
          >
            <MapPin 
              className={`w-6 h-6 ${getMarkerColor(grievance)} drop-shadow-lg`} 
              fill="currentColor" 
            />
          </div>
        ))}

        {/* Map legend */}
        <div className="absolute bottom-2 left-2 bg-white/90 rounded p-2 text-xs">
          <div className="font-medium mb-1">Legend ({viewMode}):</div>
          {viewMode === "status" ? (
            <div className="space-y-1">
              <div className="flex items-center"><div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>Submitted</div>
              <div className="flex items-center"><div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>In Progress</div>
              <div className="flex items-center"><div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>Resolved</div>
            </div>
          ) : (
            <div className="space-y-1">
              <div className="flex items-center"><div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>High</div>
              <div className="flex items-center"><div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>Medium</div>
              <div className="flex items-center"><div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>Low</div>
            </div>
          )}
        </div>
      </div>

      {/* Selected Grievance Details */}
      {selectedGrievance && (
        <div className="rounded-lg border bg-white text-gray-900 shadow-sm">
          <div className="p-4">
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <h4 className="font-medium">{selectedGrievance.title}</h4>
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(selectedGrievance.status)}`}>
                  {selectedGrievance.status}
                </span>
              </div>
              <p className="text-sm text-gray-600">ID: {selectedGrievance.id}</p>
              <p className="text-sm text-gray-600">Location: {selectedGrievance.address}</p>
              <div className="flex gap-2">
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-gray-700 border-gray-300">
                  {selectedGrievance.category}
                </span>
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-gray-700 border-gray-300">
                  {selectedGrievance.priority} priority
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GrievanceMap;
