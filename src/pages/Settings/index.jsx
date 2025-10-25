import React, { useState, useEffect } from "react";
import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";
import { useTranslation } from "react-i18next";
import { useDarkMode } from "../../contexts/DarkModeContext";
import { useNavigate } from "react-router-dom";
import { validatePassword, validatePhoneNumber, validateTelegramUsername } from "../../utils/validators";

// Query to get current user data (includes admin/teacher fields)
const ME_QUERY = gql`
  query Me {
    me {
      id
      username
      fullname
      role
      __typename
      # Admin/Teacher specific fields
      phone
      tgUsername
      birthDate
      isActive
    }
  }
`;

// Mutation to update profile (for admins and teachers only)
const UPDATE_PROFILE = gql`
  mutation UpdateProfile(
    $phone: Phone
    $tgUsername: String
  ) {
    updateProfile(
      phone: $phone
      tgUsername: $tgUsername
    ) {
      success
      message
      user {
        id
        phone
        tgUsername
      }
      errors
      timestamp
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

    // Check if user can edit profile (admin or teacher)
    const [canEditProfile, setCanEditProfile] = useState(false);

    // State for profile editing
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [tgUsername, setTgUsername] = useState("");
    const [countryCode, setCountryCode] = useState("998");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [profileValidationErrors, setProfileValidationErrors] = useState({});
    const [profileSuccess, setProfileSuccess] = useState("");

    // State for password change
    const [showPasswordChange, setShowPasswordChange] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordSuccess, setPasswordSuccess] = useState("");

    // Fetch user data
    const { data, loading, error, refetch } = useQuery(ME_QUERY, {
        errorPolicy: "all"
    });

    // Determine if user can edit profile based on ME query data
    const canEditProfileValue = data?.me?.role && (data.me.role.toLowerCase() === "admin" || data.me.role.toLowerCase() === "teacher");

    // Initialize profile editing when user data loads
    useEffect(() => {
        if (data?.me) {
            const role = data.me.role;

            // Allow editing for admin and teacher roles (case-insensitive check)
            const normalizedRole = role?.toLowerCase();
            const canEdit = normalizedRole === "admin" || normalizedRole === "teacher";
            setCanEditProfile(canEdit);

            // Initialize profile fields if editable
            if (canEdit) {
                // Use ME query data which includes admin/teacher fields
                const profileData = data?.me || {};

                setTgUsername(profileData.tgUsername || "");
                const phone = profileData.phone || "";

                // Extract country code and phone number
                if (phone && phone.startsWith("998")) {
                    setCountryCode("998");
                    setPhoneNumber(phone.substring(3));
                } else if (phone && phone.startsWith("90")) {
                    setCountryCode("90");
                    setPhoneNumber(phone.substring(2));
                } else if (phone) {
                    setCountryCode("998");
                    setPhoneNumber(phone);
                } else {
                    // No phone - set defaults
                    setCountryCode("998");
                    setPhoneNumber("");
                }
            }
        }
    }, [data]);

    // Update profile mutation (for admins and teachers)
    const [updateProfile, { loading: profileLoading }] = useMutation(UPDATE_PROFILE, {
        onCompleted: (data) => {
            if (data?.updateProfile?.success) {
                setProfileSuccess(translate("profileUpdatedSuccess") || "Profile updated successfully!");
                setIsEditingProfile(false);
                // Refetch user data to update the UI
                refetch();
                setTimeout(() => setProfileSuccess(""), 3000);
            } else {
                const errors = data?.updateProfile?.errors || [];
                const message = data?.updateProfile?.message || "Failed to update profile";
                setProfileValidationErrors({ mutation: `${message}. ${errors.join(', ')}` });
            }
        },
        onError: (error) => {
            console.error("Update profile error:", error);
            setProfileValidationErrors({ mutation: error.message || translate("errorOccured") || "An error occurred" });
        }
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

    // Handle profile update
    const handleSaveProfile = async () => {
        setProfileValidationErrors({});
        setProfileSuccess("");

        // Combine country code and phone number
        const phone = `${countryCode}${phoneNumber}`;

        // Validate phone
        const phoneError = validatePhoneNumber(phone);
        if (phoneError) {
            setProfileValidationErrors({ phone: phoneError });
            return;
        }

        // Validate telegram username
        const tgUsernameError = validateTelegramUsername(tgUsername);
        if (tgUsernameError) {
            setProfileValidationErrors({ tgUsername: tgUsernameError });
            return;
        }

        // Check if there are any changes
        const profileData = data?.me || {};
        const currentPhone = profileData.phone || "";
        const currentTgUsername = profileData.tgUsername || "";

        if (phone === currentPhone && tgUsername === currentTgUsername) {
            setProfileValidationErrors({ general: translate("noChanges") || "No changes detected" });
            return;
        }

        // Call the mutation
        try {
            await updateProfile({
                variables: {
                    phone,
                    tgUsername
                }
            });
        } catch (err) {
            console.error("Update profile error:", err);
        }
    };

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

                    {/* Profile Editing Section - Only for admins and teachers */}
                    {canEditProfile && (
                        <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                            {/* Success Message */}
                            {profileSuccess && (
                                <div
                                    className="mb-4 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                                    style={{
                                        backgroundColor: isDarkMode ? 'rgba(20, 83, 45, 0.2)' : '#f0fdf4',
                                        borderColor: isDarkMode ? '#166534' : '#bbf7d0'
                                    }}
                                >
                                    <p className="text-green-700 dark:text-green-300 text-sm">{profileSuccess}</p>
                                </div>
                            )}

                            {/* Error Messages */}
                            {profileValidationErrors.mutation && (
                                <div
                                    className="mb-4 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                                    style={{
                                        backgroundColor: isDarkMode ? 'rgba(127, 29, 29, 0.2)' : '#fef2f2',
                                        borderColor: isDarkMode ? '#991b1b' : '#fecaca'
                                    }}
                                >
                                    <p className="text-red-700 dark:text-red-300 text-sm">{profileValidationErrors.mutation}</p>
                                </div>
                            )}

                            <div className="flex items-center justify-between mb-4">
                                <h3
                                    className="text-lg font-medium"
                                    style={{
                                        color: isDarkMode ? '#f3f4f6' : '#1f2937'
                                    }}
                                >
                                    {translate("profile") || "Profile"}
                                </h3>
                                {!isEditingProfile ? (
                                    <button
                                        onClick={() => setIsEditingProfile(true)}
                                        className="px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 border"
                                        style={{
                                            backgroundColor: isDarkMode ? '#2563eb' : '#3b82f6',
                                            borderColor: isDarkMode ? '#2563eb' : '#3b82f6',
                                            color: '#ffffff'
                                        }}
                                    >
                                        {translate("edit") || "Edit"}
                                    </button>
                                ) : (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleSaveProfile}
                                            disabled={profileLoading}
                                            className="px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 border"
                                            style={{
                                                backgroundColor: isDarkMode ? '#16a34a' : '#22c55e',
                                                borderColor: isDarkMode ? '#16a34a' : '#22c55e',
                                                color: '#ffffff'
                                            }}
                                        >
                                            {profileLoading ? translate("saving") || "Saving..." : translate("save") || "Save"}
                                        </button>
                                        <button
                                            onClick={() => {
                                                setIsEditingProfile(false);
                                                setProfileValidationErrors({});
                                                // Reset to original values
                                                const phone = user.phone || "";
                                                if (phone.startsWith("998")) {
                                                    setCountryCode("998");
                                                    setPhoneNumber(phone.substring(3));
                                                } else if (phone.startsWith("90")) {
                                                    setCountryCode("90");
                                                    setPhoneNumber(phone.substring(2));
                                                }
                                                setTgUsername(user.tgUsername || "");
                                            }}
                                            className="px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 border"
                                            style={{
                                                backgroundColor: 'transparent',
                                                borderColor: isDarkMode ? '#6b7280' : '#9ca3af',
                                                color: isDarkMode ? '#d1d5db' : '#6b7280'
                                            }}
                                        >
                                            {translate("cancel") || "Cancel"}
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Telegram Username */}
                            <div>
                                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide block mb-2">
                                    {translate("telegram") || "Telegram Username"}
                                </label>
                                {isEditingProfile ? (
                                    <input
                                        type="text"
                                        value={tgUsername}
                                        onChange={(e) => setTgUsername(e.target.value)}
                                        disabled={profileLoading}
                                        className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                        style={{
                                            backgroundColor: isDarkMode ? '#374151' : '#f9fafb',
                                            borderColor: profileValidationErrors.tgUsername ? '#ef4444' : (isDarkMode ? '#4b5563' : '#e5e7eb'),
                                            color: isDarkMode ? '#f3f4f6' : '#111827'
                                        }}
                                    />
                                ) : (
                                    <div
                                        className="px-4 py-3 rounded-xl border-2 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border-gray-100 dark:border-gray-600"
                                    >
                                        {user.tgUsername || '-'}
                                    </div>
                                )}
                                {profileValidationErrors.tgUsername && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{profileValidationErrors.tgUsername}</p>
                                )}
                            </div>

                            {/* Phone Number */}
                            <div>
                                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide block mb-2">
                                    {translate("phoneNumber") || "Phone Number"}
                                </label>
                                {isEditingProfile ? (
                                    <div className="flex gap-2">
                                        <select
                                            value={countryCode}
                                            onChange={(e) => setCountryCode(e.target.value)}
                                            disabled={profileLoading}
                                            className="px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 cursor-pointer"
                                            style={{
                                                backgroundColor: isDarkMode ? '#374151' : '#f9fafb',
                                                borderColor: profileValidationErrors.phone ? '#ef4444' : (isDarkMode ? '#4b5563' : '#e5e7eb'),
                                                color: isDarkMode ? '#f3f4f6' : '#111827',
                                                appearance: 'none',
                                                backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")',
                                                backgroundRepeat: 'no-repeat',
                                                backgroundPosition: 'right 0.7rem center',
                                                backgroundSize: '1em',
                                                paddingRight: '2.5rem',
                                                minWidth: '100px'
                                            }}
                                        >
                                            <option value="998">🇺🇿 +998</option>
                                            <option value="90">🇹🇷 +90</option>
                                        </select>
                                        <input
                                            type="tel"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                            disabled={profileLoading}
                                            placeholder="901234567"
                                            maxLength="15"
                                            className="flex-1 px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                            style={{
                                                backgroundColor: isDarkMode ? '#374151' : '#f9fafb',
                                                borderColor: profileValidationErrors.phone ? '#ef4444' : (isDarkMode ? '#4b5563' : '#e5e7eb'),
                                                color: isDarkMode ? '#f3f4f6' : '#111827'
                                            }}
                                        />
                                    </div>
                                ) : (
                                    <div className="px-4 py-3 rounded-xl border-2 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border-gray-100 dark:border-gray-600 flex items-center gap-2">
                                        {user.phone ? (
                                            <>
                                                <span className="text-lg">
                                                    {user.phone.startsWith('998') ? '🇺🇿' : '🇹🇷'}
                                                </span>
                                                <span>+{user.phone}</span>
                                            </>
                                        ) : '-'}
                                    </div>
                                )}
                                {profileValidationErrors.phone && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{profileValidationErrors.phone}</p>
                                )}
                            </div>
                        </div>
                    )}

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
