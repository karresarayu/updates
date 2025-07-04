
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FileText, MapPin, Upload, Send, User, BarChart3 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { submitGrievance } from "@/services/grievanceService";

const SubmitGrievance = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    priority: "medium",
    state: "",
    location: "",
    anonymous: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  const showToast = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => {
      setToastMessage("");
      setToastType("");
    }, 5000);
  };

  const categories = [
    "Infrastructure",
    "Utilities",
    "Public Safety",
    "Environment",
    "Transportation",
    "Public Services",
    "Other"
  ];

  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", 
    "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", 
    "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", 
    "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", 
    "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", 
    "Ladakh", "Lakshadweep", "Puducherry"
  ];

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? e.target.checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('=== FORM SUBMISSION HANDLER ===');
    console.log('Event prevented:', e.defaultPrevented);
    console.log('Current user:', user);
    console.log('User ID:', user?.id);
    console.log('User email:', user?.email);
    console.log('Form data:', JSON.stringify(formData, null, 2));
    console.log('Is submitting:', isSubmitting);
    
    if (!user) {
      console.log('❌ No user found');
      showToast("You must be logged in to submit a grievance.", "error");
      return;
    }

    // Validate required fields
    const requiredFields = ['title', 'description', 'category', 'state', 'location'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      console.log('❌ Missing required fields:', missingFields);
      showToast("Please fill in all required fields.", "error");
      return;
    }

    console.log('✅ Validation passed, starting submission...');
    setIsSubmitting(true);

    try {
      console.log('📤 Calling submitGrievance service...');
      
      const submissionData = {
        ...formData,
        userId: user.id,
        userEmail: user.email
      };
      
      console.log('📋 Final submission data:', JSON.stringify(submissionData, null, 2));
      
      const grievanceId = await submitGrievance(submissionData);
      
      console.log('✅ Submission successful! ID:', grievanceId);
      showToast("Grievance submitted successfully! You will receive updates via email.", "success");
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        category: "",
        priority: "medium",
        state: "",
        location: "",
        anonymous: false
      });
      
      setTimeout(() => {
        console.log('🔄 Navigating to citizen dashboard...');
        navigate("/citizen");
      }, 2000);
      
    } catch (error) {
      console.log('❌ Submission failed with error:', error);
      console.error('Error details:', {
        name: error?.name,
        message: error?.message,
        code: error?.code,
        stack: error?.stack
      });
      
      let errorMessage = "Failed to submit grievance. Please try again.";
      
      if (error?.code === 'permission-denied') {
        errorMessage = "Permission denied. Please check your account permissions.";
      } else if (error?.code === 'unavailable') {
        errorMessage = "Service unavailable. Please check your internet connection.";
      } else if (error?.code === 'unauthenticated') {
        errorMessage = "Authentication required. Please log in again.";
      }
      
      showToast(errorMessage, "error");
    } finally {
      console.log('🔄 Setting isSubmitting to false');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 lg:p-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
          toastType === "success" 
            ? "bg-green-500 text-white" 
            : "bg-red-500 text-white"
        }`}>
          {toastMessage}
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow">
          <div className="px-4 lg:px-6 py-4 border-b border-gray-200">
            <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Submit New Grievance</h1>
            <p className="mt-2 text-gray-600 text-sm lg:text-base">
              Please provide detailed information about your issue to help us address it effectively.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-4 lg:p-6 space-y-4 lg:space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Brief summary of your grievance"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-sm lg:text-base"
              />
            </div>

            {/* Category and Priority - Side by side on larger screens */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-sm lg:text-base"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Priority */}
              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-sm lg:text-base"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            {/* State */}
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                State *
              </label>
              <select
                id="state"
                name="state"
                required
                value={formData.state}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-sm lg:text-base"
              >
                <option value="">Select a state</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  id="location"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Specific address or landmark"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-sm lg:text-base"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Provide a detailed description of the issue, including when it started, its impact, and any other relevant information..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 resize-vertical text-sm lg:text-base"
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Attachments (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 lg:p-6 text-center hover:border-gray-400 transition-colors">
                <Upload className="h-6 w-6 lg:h-8 lg:w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-xs lg:text-sm text-gray-600 mb-2">
                  Upload photos or documents related to your grievance
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*,.pdf,.doc,.docx"
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center px-3 lg:px-4 py-2 border border-gray-300 rounded-md shadow-sm text-xs lg:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                >
                  Choose Files
                </label>
                <p className="text-xs text-gray-500 mt-2">
                  Supported formats: JPG, PNG, PDF, DOC, DOCX (Max 10MB each)
                </p>
              </div>
            </div>

            {/* Anonymous Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="anonymous"
                name="anonymous"
                checked={formData.anonymous}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="anonymous" className="ml-2 block text-sm text-gray-700">
                Submit anonymously (your identity will be kept confidential)
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-4 lg:pt-6 border-t border-gray-200">
              <Link
                to="/citizen"
                className="px-4 lg:px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors text-center"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center px-4 lg:px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Grievance
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubmitGrievance;
