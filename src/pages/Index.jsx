import { Link } from "react-router-dom";
import { Shield, Users, BarChart3, MessageSquare, ArrowRight, FileText, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { isAuthenticated } = useAuth();
  
  const features = [
    {
      icon: Shield,
      title: "Secure Reporting",
      description: "Report grievances securely with end-to-end encryption and privacy protection."
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Connect with your community and track issues that matter to everyone."
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Track the progress of your complaints with detailed analytics and updates."
    },
    {
      icon: MessageSquare,
      title: "Direct Communication",
      description: "Communicate directly with city officials and get timely responses."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Smart City</span>
            </div>
            <div className="flex items-center space-x-4">
              {isAuthenticated && (
                <>
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
                </>
              )}
              {!isAuthenticated ? (
                <>
                  <Link
                    to="/login"
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Get Started
                  </Link>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Smart City
            <span className="text-blue-600"> Grievance System</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600">
            Report issues, track progress, and help build a better community. 
            Your voice matters in making our city smarter and more responsive.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={isAuthenticated ? "/submit" : "/signup"}
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Start Reporting
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            {!isAuthenticated && (
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-24">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Our Platform?</h2>
            <p className="mt-4 text-lg text-gray-600">
              Empowering citizens to create positive change in their communities
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white mx-auto">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900 text-center">
                  {feature.title}
                </h3>
                <p className="mt-2 text-base text-gray-600 text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 bg-blue-600 rounded-lg shadow-xl">
          <div className="px-6 py-12 sm:px-12 sm:py-16 lg:px-16">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white">
                Ready to Make a Difference?
              </h2>
              <p className="mt-4 text-xl text-blue-100">
                Join thousands of citizens making their communities better
              </p>
              <Link
                to={isAuthenticated ? "/submit" : "/signup"}
                className="mt-8 inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 transition-colors"
              >
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
