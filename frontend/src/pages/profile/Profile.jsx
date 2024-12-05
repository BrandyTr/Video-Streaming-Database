import React, {useState} from "react";
import { Bell, Search, Upload} from 'lucide-react';
import { Eye, EyeOff } from 'lucide-react';

import Header from "../../components-main/header/Header";

const ProfileEdit = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: 'user@example.com',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        profileImage: null,
    });

    const [errors, setErrors] = useState({});
    const [showCurrentPassword, setshowCurrentPassword] = useState(false);
    const [showNewPassword, setshowNewPassword] = useState(false);
    const [showConfirmPassword, setshowConfirmPassword] = useState(false);

    const handleUploadImage = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData( prev => ({
                    ...prev,
                    profileImage: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!formData.currentPassword) {
            newErrors.currentPassword = 'Current password is required';
        }

        if (formData.newPassword != formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            console.log("Form submitted: ",formData);
        }
    };

    return (
        <div className="min-h-screen">
            <Header></Header>

            <div className="max-w-2xl mx-auto p-6 mt-20">
                <h1 className="text-3xl font-bold text-cyan-400 mb-8">Profile</h1>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Profile Image */}
                    <div className="relative w-40 h-40 mx-auto">
                        <img 
                            src={formData.profileImage} 
                            alt="Profile"
                            className="w-full h-full rounded-full object-cover" 
                        />
                        <label 
                            className="absolute bottom-0 right-3 bg-cyan-400 p-2 rounded-full cursor-pointer"
                        >
                            <Upload className="w-5 h-5 text-white"></Upload>
                            <input 
                                type="file" 
                                className="hidden" 
                                accept="image/*"
                                onChange={handleUploadImage}
                            />
                        </label>
                    </div>

                    {/* Username */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-200">Username</label>
                        <input 
                            type="text"
                            id="username"
                            value={formData.username}
                            onChange={(e) => setFormData( prev => ({
                                ...prev,
                                username: e.target.value,
                            }))}
                            placeholder="Change username"
                            className="mt-1 p-2 w-full bg-gray-800 border border-gray-600 text-white rounded" />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-200">Email</label>
                        <input
                            type="email"
                            className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none cursor-not-allowed"
                            value={formData.email}
                            disabled
                        />
                        <p className="text-sm text-cyan-400">Can not change email address</p>
                    </div>

                    <h2 className="text-2xl font-bold text-cyan-400 pt-4">Password</h2>
                    
                    {/* Current password */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-200">Current Password</label>
                        <div className="relative">
                            <input
                                type={showCurrentPassword ? 'text' : 'password'}
                                className={`w-full p-3 rounded bg-gray-800 border ${errors.currentPassword ? 'border-red-500' : 'border-gray-600'} focus:outline-none focus:border-cyan-400`}
                                value={formData.currentPassword}
                                onChange={(e) => setFormData( prev => ({
                                    ...prev,
                                    currentPassword: e.target.value,
                                }))}
                                placeholder="Enter current password"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                onClick={() => setshowCurrentPassword(!showCurrentPassword)}
                            >
                                {showCurrentPassword ? <Eye className="w-5 h-5"/> : <EyeOff className="w-5 h-5"/>}
                            </button>
                        </div>
                        {errors.currentPassword && (
                            <p className="text-red-500 text-sm">{errors.currentPassword}</p>
                        )}
                    </div>

                    {/* New password */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-200">New Password</label>
                        <div className="relative">
                            <input
                                type={showNewPassword ? 'text' : 'password'}
                                className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-cyan-400"
                                value={formData.newPassword}
                                onChange={(e) => setFormData( prev => ({
                                    ...prev,
                                    newPassword: e.target.value,
                                }))}
                                placeholder="Enter new password"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                onClick={() => setshowNewPassword(!showNewPassword)}
                            >
                                {showNewPassword ? <Eye className="w-5 h-5"/> : <EyeOff className="w-5 h-5"/>}
                            </button>
                        </div>
                    </div>

                    {/* Confirm password */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-200">Confirm New Password</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                className={`w-full p-3 rounded bg-gray-800 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-700'} focus:outline-none focus:border-cyan-400`}
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData( prev => ({
                                    ...prev,
                                    confirmPassword: e.target.value,
                                }))}
                                placeholder="Confirm new password"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                onClick={() => setshowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <Eye className="w-5 h-5"/> : <EyeOff className="w-5 h-5"/>}
                            </button>
                        </div>
                        {errors.currentPassword && (
                            <p className="text-red-500 text-sm">{errors.currentPassword}</p>
                        )}
                    </div>

                    {/* Save changes */}
                    <div className="space-y-2">
                        <button type="submit" className="w-full p-3 rounded bg-cyan-400 text-white hover:bg-cyan-500 focus:outline-none">
                            Save Changes
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default ProfileEdit;