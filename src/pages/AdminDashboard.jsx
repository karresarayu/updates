
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BarChart3, Users, FileText, Clock, CheckCircle, AlertTriangle, LogOut, User, Menu, X, Search, Filter, Plus, ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getAllGrievances } from "@/services/grievanceService";

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGrievances = async () => {
      try {
        setLoading(true);
        const allGrievances = await getAllGrievances();
        setGrievances(allGrievances);
      } catch (error) {
        console.error('Error fetching grievances:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGrievances();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Calculate stats from real data
  const stats = [
    { title: "Total Grievances", value: grievances.length.toString(), icon: FileText, color: "bg-blue-600" },
    { title: "Pending", value: grievances.filter(g => g.status === 'pending').length.toString(), icon: Clock, color: "bg-yellow-600" },
    { title: "In Progress", value: grievances.filter(g => g.status === 'in-progress').length.toString(), icon: AlertTriangle, color: "bg-orange-600" },
    { title: "Resolved", value: grievances.filter(g => g.status === 'resolved').length.toString(), icon: CheckCircle, color: "bg-green-600" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "resolved": return "bg-green-100 text-green-800";
      case "in-progress": return "bg-orange-100 text-orange-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString();
  };

  const getStatusDisplay = (status) => {
    switch (status) {
      case 'in-progress': return 'In Progress';
      case 'pending': return 'Pending';
      case 'resolved': return 'Resolved';
      case 'closed': return 'Closed';
      default: return status;
    }
  };

  const getPriorityDisplay = (priority) => {
    return priority.charAt(0).toUpperCase() + priority.slice(1);
  };

  const filteredGrievances = grievances.filter(grievance => {
    const matchesSearch = grievance.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         grievance.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         grievance.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || grievance.status.toLowerCase().replace("-", "") === filterStatus.replace("progress", "progress");
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="p-4 lg:p-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading grievances...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-2 text-gray-600 text-sm lg:text-base">Manage and oversee all citizen grievances.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-xl lg:text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`flex-shrink-0 p-2 lg:p-3 rounded-md ${stat.color}`}>
                <stat.icon className="h-4 w-4 lg:h-6 lg:w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Grievances Management */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-4 lg:px-6 py-4 border-b border-gray-200">
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <h3 className="text-lg font-medium text-gray-900">All Grievances</h3>
            
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search grievances..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none w-full sm:w-auto"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="inprogress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Card View */}
        <div className="block lg:hidden">
          <div className="divide-y divide-gray-200">
            {filteredGrievances.map((grievance) => (
              <div key={grievance.id} className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{grievance.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{grievance.id.substring(0, 8)}...</p>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(grievance.status)}`}>
                      {getStatusDisplay(grievance.status)}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(grievance.priority)}`}>
                      {getPriorityDisplay(grievance.priority)}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-900">{grievance.location}</p>
                  <p className="text-xs text-gray-500">{grievance.state}</p>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{formatDate(grievance.createdAt)}</span>
                  <span>{grievance.userEmail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location & State
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Citizen
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredGrievances.map((grievance) => (
                <tr key={grievance.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {grievance.id.substring(0, 8)}...
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="font-medium">{grievance.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <div className="text-gray-900">{grievance.location}</div>
                      <div className="text-gray-500 text-xs">{grievance.state}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {grievance.userEmail}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(grievance.status)}`}>
                      {getStatusDisplay(grievance.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(grievance.priority)}`}>
                      {getPriorityDisplay(grievance.priority)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(grievance.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredGrievances.length === 0 && !loading && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">
              {grievances.length === 0 
                ? "No grievances submitted yet." 
                : "No grievances found matching your criteria."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
