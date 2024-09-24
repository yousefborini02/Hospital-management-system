import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, updateUserProfile } from "../../store/slices/userSlice";
import {
  User,
  Mail,
  Lock,
  Edit2,
  Save,
  X,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import Navbar from "../../components/navbar";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { user, loading, error } = useSelector((state) => state.profile);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    const result = await dispatch(
      updateUserProfile({ name, email, currentPassword, newPassword })
    );
    if (!result.error) {
      setSuccessMessage("Profile updated successfully");
      setCurrentPassword("");
      setNewPassword("");
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setName(user.name);
    setEmail(user.email);
    setCurrentPassword("");
    setNewPassword("");
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  return (
    <div
      className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: "url('https://img.freepik.com/free-photo/stethoscope-clipboard_23-2147652325.jpg?w=996&t=st=1727079292~exp=1727079892~hmac=758d7d04dcb527877dda725ae21d1c992aea961dd82f16d166642ad3bbfadd5e')", // Replace with your image URL
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Navbar />
      <div className="max-w-md mx-auto bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-xl shadow-md overflow-hidden md:max-w-2xl mt-20">
        {/* Added mt-8 to create space above the form */}
        <div className="md:flex">
          <div className="md:shrink-0">
            <div className="h-48 w-full object-cover md:h-full md:w-48 bg-blue-500 flex items-center justify-center">
              <User size={64} className="text-white" />
            </div>
          </div>
          <div className="p-8 w-full">
            <div className="uppercase tracking-wide text-sm text-blue-500 font-semibold mb-1">
              Hospital User Profile
            </div>
            <h2 className="block mt-1 text-lg leading-tight font-medium text-black">
              {name}
            </h2>
            {error && (
              <div className="mt-4 flex items-center text-red-500">
                <AlertCircle size={20} className="mr-2" />
                <span>{error}</span>
              </div>
            )}
            {successMessage && (
              <div className="mt-4 flex items-center text-green-500">
                <CheckCircle size={20} className="mr-2" />
                <span>{successMessage}</span>
              </div>
            )}
            <form onSubmit={handleSubmit} className="mt-8">
              {/* Increased mt-6 to mt-8 for more space */}
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 text-sm font-bold mb-2 flex items-center"
                >
                  <User size={16} className="mr-2" />
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={!isEditing}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2 flex items-center"
                >
                  <Mail size={16} className="mr-2" />
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!isEditing}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              {isEditing && (
                <>
                  <div className="mb-4">
                    <label
                      htmlFor="currentPassword"
                      className="block text-gray-700 text-sm font-bold mb-2 flex items-center"
                    >
                      <Lock size={16} className="mr-2" />
                      Current Password
                    </label>
                    <input
                      id="currentPassword"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="newPassword"
                      className="block text-gray-700 text-sm font-bold mb-2 flex items-center"
                    >
                      <Lock size={16} className="mr-2" />
                      New Password
                    </label>
                    <input
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                </>
              )}
              <div className="flex items-center justify-end">
                {!isEditing ? (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
                  >
                    <Edit2 size={16} className="mr-2" />
                    Edit Profile
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2 flex items-center"
                    >
                      <X size={16} className="mr-2" />
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
                    >
                      <Save size={16} className="mr-2" />
                      {loading ? "Updating..." : "Save Changes"}
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
