
import { Link } from "react-router-dom";
import { Home, ArrowLeft, FileText, User, BarChart3 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const NotFound = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      {isAuthenticated && (
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Home className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">Smart City Portal</span>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  to="/submit"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Submit Grievance
                </Link>
                <Link
                  to="/citizen"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <User className="h-4 w-4 mr-2" />
                  Citizen Dashboard
                </Link>
                <Link
                  to="/admin"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Admin Dashboard
                </Link>
              </div>
            </div>
          </div>
        </nav>
      )}

      <div className="flex items-center justify-center px-4" style={{ minHeight: isAuthenticated ? 'calc(100vh - 64px)' : '100vh' }}>
        <div className="max-w-md w-full text-center">
          {/* Back to Home Button */}
          <div className="mb-8 text-left">
            <Link
              to="/"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-9xl font-bold text-blue-600 mb-4">404</h1>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h2>
            <p className="text-gray-600 mb-8">
              Sorry, the page you are looking for doesn't exist or has been moved.
            </p>
          </div>
          
          <div className="space-y-4">
            <Link
              to="/"
              className="inline-flex items-center justify-center w-full px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              <Home className="h-5 w-5 mr-2" />
              Go to Homepage
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center w-full px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
