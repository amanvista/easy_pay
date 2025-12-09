import { useState, useEffect } from "react";
import { User, Mail, Phone, Calendar, Edit2, Save, X, Image } from "lucide-react";
import { useAuth } from "../../app/hooks/useAuth";
import { useDispatch } from "react-redux";
import { checkAuth } from "../../app/slices/authSlice";
import { toast } from "react-toastify";
import authService from "../../services/authService";
import { useSearchParams } from "react-router-dom";

export default function ProfilePage() {
    const [searchParams] = useSearchParams();

  const { userInfo: authData } = useAuth();
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Extract user data - handle both direct userInfo and nested user object
  const userInfo = authData?.user || authData;

  useEffect(() => {
        const code = searchParams.get("code");
    const scope = searchParams.get("scope");
    if (userInfo) {
      setFormData({
        name: userInfo.name || "",
        email: userInfo.email || "",
        phone: userInfo.phone || "",
      });
    }
  }, [userInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // For phone number, only allow digits and limit to 10
    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '');
      setFormData((prev) => ({
        ...prev,
        [name]: digitsOnly.slice(0, 10),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate phone number if provided
    if (formData.phone && formData.phone.length !== 10) {
      toast.error("Phone number must be exactly 10 digits");
      return;
    }
    
    setLoading(true);

    try {
      // Call API to update profile
      const response = await authService.updateProfile(formData);
      
      // Refresh user info from server to get latest data
      await dispatch(checkAuth()).unwrap();
      
      // Show success message from API or default
      const successMessage = response.data?.message || response.message || "Profile updated successfully!";
      toast.success(successMessage);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      const errorMessage = error.response?.data?.message || error.response?.data?.error || "Failed to update profile";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: userInfo?.name || "",
      email: userInfo?.email || "",
      phone: userInfo?.phone || "",
    });
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-orange-500" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {userInfo?.name || "User"}
                </h1>
                <p className="text-gray-500">{userInfo?.email}</p>
              </div>
            </div>
            
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
              >
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Profile Form */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Personal Information
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </div>
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              ) : (
                <p className="text-gray-900 px-4 py-2 bg-gray-50 rounded-lg">
                  {userInfo?.name || "N/A"}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </div>
              </label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              ) : (
                <p className="text-gray-900 px-4 py-2 bg-gray-50 rounded-lg">
                  {userInfo?.email || "N/A"}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone Number
                </div>
              </label>
              {isEditing ? (
                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Enter 10-digit phone number"
                    maxLength="10"
                    pattern="[0-9]{10}"
                  />
                  {formData.phone && formData.phone.length !== 10 && (
                    <p className="text-red-500 text-sm mt-1">
                      Phone number must be exactly 10 digits
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-gray-900 px-4 py-2 bg-gray-50 rounded-lg">
                  {userInfo?.phone || "Not provided"}
                </p>
              )}
            </div>

            {/* Profile Picture */}
            {userInfo?.picture && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <Image className="w-4 h-4" />
                    Profile Picture
                  </div>
                </label>
                <img
                  src={userInfo.picture}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                />
              </div>
            )}

            {/* Last Synced */}
            {userInfo?.last_synced && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Last Synced
                  </div>
                </label>
                <p className="text-gray-900 px-4 py-2 bg-gray-50 rounded-lg">
                  {formatDate(userInfo.last_synced)}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-4 h-4" />
                  {loading ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Account Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <p className="text-3xl font-bold text-orange-500">
              {userInfo?.totalOrders || 0}
            </p>
            <p className="text-gray-600 mt-1">Total Orders</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <p className="text-3xl font-bold text-green-500">
              {userInfo?.completedOrders || 0}
            </p>
            <p className="text-gray-600 mt-1">Completed</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <p className="text-3xl font-bold text-blue-500">
              {userInfo?.savedAddresses || 0}
            </p>
            <p className="text-gray-600 mt-1">Saved Addresses</p>
          </div>
        </div>
      </div>
    </div>
  );
}
