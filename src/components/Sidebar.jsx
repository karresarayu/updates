
import { Link, useLocation } from "react-router-dom";
import { Plus, User, BarChart3, ArrowLeft, X } from "lucide-react";

const Sidebar = ({ isOpen, onToggle }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navigationItems = [
    {
      title: "Submit Grievance",
      path: "/submit",
      icon: Plus,
      description: "Submit new grievance"
    },
    {
      title: "Citizen Dashboard",
      path: "/citizen",
      icon: User,
      description: "View your grievances"
    },
    {
      title: "Admin Dashboard", 
      path: "/admin",
      icon: BarChart3,
      description: "Manage all grievances"
    }
  ];

  const isActive = (path) => currentPath === path;

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:left-0 lg:top-0 lg:h-full lg:w-60 lg:bg-white lg:border-r lg:border-gray-200 lg:shadow-sm lg:z-10 lg:flex lg:flex-col">
        {/* Back to Home Button */}
        <div className="p-4 border-b border-gray-200">
          <Link
            to="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4 flex-1">
          <div className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center p-3 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon className={`h-5 w-5 mr-3 ${
                    isActive(item.path) ? "text-blue-600" : "text-gray-500"
                  }`} />
                  <div>
                    <div className="font-medium text-sm">{item.title}</div>
                    <div className={`text-xs ${
                      isActive(item.path) ? "text-blue-600" : "text-gray-500"
                    }`}>
                      {item.description}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 shadow-lg z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Header with close button */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm"
            onClick={() => onToggle(false)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <button
            onClick={() => onToggle(false)}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <div className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => onToggle(false)}
                  className={`flex items-center p-3 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon className={`h-5 w-5 mr-3 ${
                    isActive(item.path) ? "text-blue-600" : "text-gray-500"
                  }`} />
                  <div>
                    <div className="font-medium text-sm">{item.title}</div>
                    <div className={`text-xs ${
                      isActive(item.path) ? "text-blue-600" : "text-gray-500"
                    }`}>
                      {item.description}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
