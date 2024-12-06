import React, { useEffect, useState } from "react";
import { Bell, Search, Upload, Eye, EyeOff } from "lucide-react";
import Header from "../../components-main/header/Header";
import { useAuth } from "../../Context/authContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ProfileEdit = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    image: null,
  });
  const [errors, setErrors] = useState({});
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(user?.image);
  const [isChangePassword, setIsChangePassword] = useState(false);
  useEffect(() => {
    if (!isChangePassword) {
      setFormData((prevState) => ({
        ...prevState,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    }
  }, [isChangePassword]);
  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        setFormData((prev) => ({ ...prev, image: file }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (isChangePassword) {
      if (formData.newPassword !== formData.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";
      setErrors(newErrors);
    }

    if (Object.keys(newErrors).length === 0) {
      try {
        const data = new FormData();
        if (formData.username != user.username) {
          data.append("username", formData.username);
        }
        data.append("email", formData.email);
        data.append("currentPassword", formData.currentPassword);
        data.append("newPassword", formData.newPassword);
        if (formData.image) data.append("image", formData.image);
        const res = await axios.put("/api/user/profile", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setUser(res.data.user);
        toast.success("Profile updated successfully!");
        navigate("/");
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      }
    }
  };

  const handlePasswordSwitch = () => setIsChangePassword((prev) => !prev);
  const hasChange = () => {
    if(user.isGoogleAccount&&!user.password){
        return (
            formData.username !== user.username ||
            formData.email !== user.email ||
            (
              formData.newPassword &&
              formData.confirmPassword) ||
            formData.image
          );
    }
    return (
      formData.username !== user.username ||
      formData.email !== user.email ||
      (formData.currentPassword &&
        formData.newPassword &&
        formData.confirmPassword) ||
      formData.image
    );
  };
  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-2xl mx-auto p-6 mt-20">
        <h1 className="text-3xl font-bold text-cyan-400 mb-8">Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Profile Image */}
          <div className="relative w-40 h-40 mx-auto">
            <img
              src={profileImage}
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
            <label className="absolute bottom-0 right-3 bg-cyan-400 p-2 rounded-full cursor-pointer">
              <Upload className="w-5 h-5 text-white" />
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleUploadImage}
              />
            </label>
          </div>

          {/* Username */}
          <div className="mt-5">
            <label className="block text-sm font-medium text-gray-200">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, username: e.target.value }))
              }
              placeholder="Change username"
              className="mt-1 p-2 w-full bg-gray-800 border border-gray-600 text-white rounded"
            />
          </div>

          {/* Email */}
          <div className="mt-5">
            <label className="block text-sm font-medium text-gray-200">
              Email
            </label>
            <input
              type="email"
              className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none cursor-not-allowed"
              value={formData.email}
              disabled
            />
            <p className="text-sm text-cyan-400">Cannot change email address</p>
          </div>

          {/* Toggle Password Change */}
          <button
            type="button"
            onClick={handlePasswordSwitch}
            className={`flex px-3 py-2 rounded-md text-sm ${
              isChangePassword
                ? "bg-white font-bold text-cyan-400"
                : "bg-red-600 text-white"
            }  mt-4`}
          >
            <p>Change password?</p>
          </button>
          {/* Password Fields */}
          {isChangePassword && (
            <>
              {/* Current Password */}
              {user.isGoogleAccount && !user.password ? (
                <div>
                  <p className="text-green-500">Set up your inital password!</p>
                  {/* New Password */}
                  <div className="mt-5">
                    <label className="block text-sm font-medium text-gray-200">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-cyan-400"
                        value={formData.newPassword}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            newPassword: e.target.value,
                          }))
                        }
                        placeholder="Enter new password"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        onClick={() => setShowNewPassword((prev) => !prev)}
                      >
                        {showNewPassword ? (
                          <Eye className="w-5 h-5" />
                        ) : (
                          <EyeOff className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="mt-5">
                    <label className="block text-sm font-medium text-gray-200">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        className={`w-full p-3 rounded bg-gray-800 border ${
                          errors.confirmPassword
                            ? "border-red-500"
                            : "border-gray-700"
                        } focus:outline-none focus:border-cyan-400`}
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            confirmPassword: e.target.value,
                          }))
                        }
                        placeholder="Confirm new password"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                      >
                        {showConfirmPassword ? (
                          <Eye className="w-5 h-5" />
                        ) : (
                          <EyeOff className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mt-5">
                    <label className="block text-sm font-medium text-gray-200">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        className={`w-full p-3 rounded bg-gray-800 border ${
                          errors.currentPassword
                            ? "border-red-500"
                            : "border-gray-600"
                        } focus:outline-none focus:border-cyan-400`}
                        value={formData.currentPassword}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            currentPassword: e.target.value,
                          }))
                        }
                        placeholder="Enter current password"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        onClick={() => setShowCurrentPassword((prev) => !prev)}
                      >
                        {showCurrentPassword ? (
                          <Eye className="w-5 h-5" />
                        ) : (
                          <EyeOff className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    {errors.currentPassword && (
                      <p className="text-red-500 text-sm">
                        {errors.currentPassword}
                      </p>
                    )}
                  </div>

                  {/* New Password */}
                  <div className="mt-5">
                    <label className="block text-sm font-medium text-gray-200">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-cyan-400"
                        value={formData.newPassword}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            newPassword: e.target.value,
                          }))
                        }
                        placeholder="Enter new password"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        onClick={() => setShowNewPassword((prev) => !prev)}
                      >
                        {showNewPassword ? (
                          <Eye className="w-5 h-5" />
                        ) : (
                          <EyeOff className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="mt-5">
                    <label className="block text-sm font-medium text-gray-200">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        className={`w-full p-3 rounded bg-gray-800 border ${
                          errors.confirmPassword
                            ? "border-red-500"
                            : "border-gray-700"
                        } focus:outline-none focus:border-cyan-400`}
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            confirmPassword: e.target.value,
                          }))
                        }
                        placeholder="Confirm new password"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                      >
                        {showConfirmPassword ? (
                          <Eye className="w-5 h-5" />
                        ) : (
                          <EyeOff className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Save Changes Button */}
          <div className="mt-5">
            <button
              type="submit"
              className={`w-full p-3 rounded ${
                !hasChange()
                  ? "bg-gray-400 text-gray500 hover:bg-gray-500"
                  : "bg-cyan-400 text-white hover:bg-cyan-500"
              } focus:outline-none`}
              disabled={!hasChange()}
            >
              {hasChange() ? "Save changes" : "No changes to save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;
