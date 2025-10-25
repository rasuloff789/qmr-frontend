import React, { useState } from "react";
import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";
import { useTranslation } from "react-i18next";
import { useDarkMode } from "../../contexts/DarkModeContext";
import { useNavigate } from "react-router-dom";
import { validatePassword } from "../../utils/validators";

// Query to get current user data (only fields available on root user type)
const ME_QUERY = gql`
  query Me {
    me {
      id
      username
      fullname
      role
    }
  }
`;

// Mutation to change password
const CHANGE_PASSWORD = gql`
  mutation ChangePassword($currentPassword: String!, $newPassword: String!) {
    changePassword(currentPassword: $currentPassword, newPassword: $newPassword) {
      success
      message
      errors
      timestamp
    }
  }
`;

export default function Settings() {
    const { t: translate } = useTranslation();
    const { isDarkMode } = useDarkMode();
    const navigate = useNavigate();

    // State for password change
    const [showPasswordChange, setShowPasswordChange] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordSuccess, setPasswordSuccess] = useState("");

    // Fetch user data
    const { data, loading, error } = useQuery(ME_QUERY, {
        errorPolicy: "all"
    });

    // Change password mutation
    const [changePassword, { loading: passwordLoading }] = useMutation(CHANGE_PASSWORD, {
        onCompleted: (data) => {
            if (data?.changePassword?.success) {
                setPasswordSuccess(translate("passwordChangedSuccess") || "Password changed successfully!");
                setOldPassword("");
                setNewPassword("");
                setConfirmPassword("");
                setShowPasswordChange(false);
                setTimeout(() => setPasswordSuccess(""), 3000);
            } else {
                const errors = data?.changePassword?.errors || [];
                const message = data?.changePassword?.message || "Failed to change password";
                setPasswordError(`${message}. ${errors.join(', ')}`);
            }
        },
        onError: (error) => {
            console.error("Change password error:", error);
            setPasswordError(error.message || translate("errorOccured") || "An error occurred");
        }
    });

    // Handle password change
    const handlePasswordChange = async () => {
        setPasswordError("");
        setPasswordSuccess("");

        // Validate new password
        const passwordValidation = validatePassword(newPassword);
        if (passwordValidation) {
            setPasswordError(translate(passwordValidation) || "Invalid password");
            return;
        }

        // Check if new password matches confirm password
        if (newPassword !== confirmPassword) {
            setPasswordError(translate("passwordsDoNotMatch") || "Passwords do not match");
            return;
        }

        // Check if old password is provided
        if (!oldPassword) {
            setPasswordError(translate("oldPasswordRequired") || "Old password is required");
            return;
        }

        // Call the mutation
        try {
            await changePassword({
                variables: {
                    currentPassword: oldPassword,
                    newPassword
                }
            });
        } catch (err) {
            console.error("Password change error:", err);
        }
    };

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem("authentification");
        localStorage.removeItem("userRole");
        navigate("/login", { replace: true });
        window.location.reload();
    };

    if (loading) return <div>{translate("loading")}</div>;
    if (error) return <div>{translate("error")}: {error.message}</div>;

    const user = data?.me;
    if (!user) return <div>{translate("userNotFound") || "User not found"}</div>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1
                        className="text-3xl font-light mb-2"
                        style={{
                            color: isDarkMode ? '#ffffff' : '#111827'
                        }}
                    >
                        {translate("settings")}
                    </h1>
                    <div
                        className="w-16 h-0.5 bg-blue-500"
                        style={{
                            backgroundColor: isDarkMode ? '#60a5fa' : '#3b82f6'
                        }}
                    ></div>
                </div>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200"
                    style={{
                        backgroundColor: isDarkMode ? '#dc2626' : '#dc2626'
                    }}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>{translate("logout")}</span>
                </button>
            </div>

            {/* Profile Card */}
            <div
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
                style={{
                    backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                    borderColor: isDarkMode ? '#374151' : '#f3f4f6'
                }}
            >
                <div className="p-8 space-y-6">
                    {/* ID - Read Only */}
                    <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide block mb-2">
                            ID
                        </label>
                        <div
                            className="px-4 py-3 rounded-xl border-2 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border-gray-100 dark:border-gray-600"
                        >
                            {user.id}
                        </div>
                    </div>

                    {/* Username - Read Only */}
                    <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide block mb-2">
                            {translate("username")}
                        </label>
                        <div
                            className="px-4 py-3 rounded-xl border-2 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border-gray-100 dark:border-gray-600"
                        >
                            {user.username}
                        </div>
                    </div>

                    {/* Fullname - Read Only */}
                    <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide block mb-2">
                            {translate("fullname")}
                        </label>
                        <div
                            className="px-4 py-3 rounded-xl border-2 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border-gray-100 dark:border-gray-600"
                        >
                            {user.fullname}
                        </div>
                    </div>

                    {/* Role - Read Only */}
                    <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide block mb-2">
                            Role
                        </label>
                        <div className="px-4 py-3 rounded-xl border-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-100 dark:border-gray-600">
                            {user.role}
                        </div>
                    </div>

                    {/* Password Change Section */}
                    <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                        {/* Success Message */}
                        {passwordSuccess && (
                            <div
                                className="mb-4 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                                style={{
                                    backgroundColor: isDarkMode ? 'rgba(20, 83, 45, 0.2)' : '#f0fdf4',
                                    borderColor: isDarkMode ? '#166534' : '#bbf7d0'
                                }}
                            >
                                <p className="text-green-700 dark:text-green-300 text-sm">{passwordSuccess}</p>
                            </div>
                        )}

                        <div className="flex items-center justify-between mb-4">
                            <h3
                                className="text-lg font-medium"
                                style={{
                                    color: isDarkMode ? '#f3f4f6' : '#1f2937'
                                }}
                            >
                                {translate("changePassword") || "Change Password"}
                            </h3>
                            <button
                                onClick={() => {
                                    setShowPasswordChange(!showPasswordChange);
                                    setPasswordError("");
                                    setPasswordSuccess("");
                                    setOldPassword("");
                                    setNewPassword("");
                                    setConfirmPassword("");
                                }}
                                className="px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 border"
                                style={{
                                    backgroundColor: isDarkMode ? '#374151' : '#ffffff',
                                    color: isDarkMode ? '#f3f4f6' : '#1f2937',
                                    borderColor: isDarkMode ? '#6b7280' : '#d1d5db'
                                }}
                            >
                                {showPasswordChange ? translate("cancel") || "Cancel" : translate("changePassword") || "Change"}
                            </button>
                        </div>

                        {showPasswordChange && (
                            <div className="space-y-4">
                                {/* Old Password */}
                                <div>
                                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide block mb-2">
                                        {translate("oldPassword") || "Old Password"}
                                    </label>
                                    <input
                                        type="password"
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-blue-200 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30"
                                        style={{
                                            backgroundColor: isDarkMode ? '#374151' : '#ffffff',
                                            color: isDarkMode ? '#f3f4f6' : '#111827'
                                        }}
                                        placeholder={translate("enterOldPassword") || "Enter old password"}
                                    />
                                </div>

                                {/* New Password */}
                                <div>
                                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide block mb-2">
                                        {translate("newPassword") || "New Password"}
                                    </label>
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-blue-200 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30"
                                        style={{
                                            backgroundColor: isDarkMode ? '#374151' : '#ffffff',
                                            color: isDarkMode ? '#f3f4f6' : '#111827'
                                        }}
                                        placeholder={translate("enterNewPassword") || "Enter new password"}
                                    />
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide block mb-2">
                                        {translate("confirmPassword") || "Confirm Password"}
                                    </label>
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-blue-200 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30"
                                        style={{
                                            backgroundColor: isDarkMode ? '#374151' : '#ffffff',
                                            color: isDarkMode ? '#f3f4f6' : '#111827'
                                        }}
                                        placeholder={translate("confirmNewPassword") || "Confirm new password"}
                                    />
                                </div>

                                {/* Error Message */}
                                {passwordError && (
                                    <div
                                        className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                                        style={{
                                            backgroundColor: isDarkMode ? 'rgba(127, 29, 29, 0.2)' : '#fef2f2',
                                            borderColor: isDarkMode ? '#991b1b' : '#fecaca'
                                        }}
                                    >
                                        <p className="text-red-700 dark:text-red-300 text-sm">{passwordError}</p>
                                    </div>
                                )}

                                {/* Save Button */}
                                <button
                                    onClick={handlePasswordChange}
                                    disabled={passwordLoading || !oldPassword || !newPassword || !confirmPassword}
                                    className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    style={{
                                        backgroundColor: isDarkMode ? '#2563eb' : '#2563eb'
                                    }}
                                >
                                    {passwordLoading ? translate("loading") : translate("saveChanges") || "Save Changes"}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
