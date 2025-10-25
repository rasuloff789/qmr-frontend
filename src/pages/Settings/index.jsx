import React, { useState, useEffect } from "react";
import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";
import { useTranslation } from "react-i18next";
import { useDarkMode } from "../../contexts/DarkModeContext";
import { useNavigate } from "react-router-dom";
import { validatePhoneNumber, validateTelegramUsername } from "../../utils/validators";

// Query to get current user data
const ME_QUERY = gql`
  query Me {
    me {
      id
      username
      fullname
      phone
      tgUsername
      birthDate
      role
      isActive
    }
  }
`;

// Mutation to update user profile (only tgUsername and phone)
const UPDATE_PROFILE = gql`
  mutation UpdateProfile($tgUsername: String, $phone: Phone) {
    updateProfile(tgUsername: $tgUsername, phone: $phone) {
      success
      message
      user {
        id
        tgUsername
        phone
      }
      errors
      timestamp
    }
  }
`;

export default function Settings() {
    const { t: translate } = useTranslation();
    const { isDarkMode } = useDarkMode();
    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);
    const [tgUsername, setTgUsername] = useState("");
    const [countryCode, setCountryCode] = useState("998");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [validationErrors, setValidationErrors] = useState({});
    const [saveMessage, setSaveMessage] = useState("");

    // Fetch user data
    const { data, loading, error, refetch } = useQuery(ME_QUERY, {
        errorPolicy: "all"
    });

    // Update profile mutation
    const [updateProfile, { loading: mutationLoading }] = useMutation(UPDATE_PROFILE, {
        onCompleted: (data) => {
            if (data?.updateProfile?.success) {
                setIsEditing(false);
                setSaveMessage(translate("profileUpdated") || "Profile updated successfully!");
                setTimeout(() => setSaveMessage(""), 3000);
                refetch();
            } else {
                const errors = data?.updateProfile?.errors || [];
                const message = data?.updateProfile?.message || "Failed to update profile";
                alert(`${message}. ${errors.join(', ')}`);
            }
        },
        onError: (error) => {
            console.error("Update profile error:", error);
            alert(translate("errorOccured") || "An error occurred");
        }
    });

    // Initialize form when user data loads
    useEffect(() => {
        if (data?.me) {
            setTgUsername(data.me.tgUsername || "");
            const phone = data.me.phone || "";

            // Extract country code and phone number
            if (phone.startsWith("998")) {
                setCountryCode("998");
                setPhoneNumber(phone.substring(3));
            } else if (phone.startsWith("90")) {
                setCountryCode("90");
                setPhoneNumber(phone.substring(2));
            } else {
                setCountryCode("998");
                setPhoneNumber(phone);
            }
        }
    }, [data]);

    // Handle edit button click
    const handleEdit = () => {
        setIsEditing(true);
        setValidationErrors({});
        setSaveMessage("");
    };

    // Handle cancel
    const handleCancel = () => {
        setIsEditing(false);
        setValidationErrors({});
        setSaveMessage("");

        // Reset to original values
        if (data?.me) {
            setTgUsername(data.me.tgUsername || "");
            const phone = data.me.phone || "";
            if (phone.startsWith("998")) {
                setCountryCode("998");
                setPhoneNumber(phone.substring(3));
            } else if (phone.startsWith("90")) {
                setCountryCode("90");
                setPhoneNumber(phone.substring(2));
            }
        }
    };

    // Handle save
    const handleSave = async () => {
        setValidationErrors({});

        // Validate inputs
        const phone = `${countryCode}${phoneNumber}`;
        const tgError = validateTelegramUsername(tgUsername);
        const phoneError = validatePhoneNumber(phone);

        if (tgError || phoneError) {
            setValidationErrors({
                tgUsername: tgError,
                phone: phoneError
            });
            return;
        }

        // Send update mutation
        try {
            await updateProfile({
                variables: {
                    tgUsername: tgUsername.trim() || undefined,
                    phone: phone || undefined
                }
            });
        } catch (err) {
            console.error("Update error:", err);
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
            <div className="mb-8">
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

            {/* Profile Card */}
            <div
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
                style={{
                    backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                    borderColor: isDarkMode ? '#374151' : '#f3f4f6'
                }}
            >
                <div className="p-8 space-y-6">
                    {/* Success Message */}
                    {saveMessage && (
                        <div
                            className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                            style={{
                                backgroundColor: isDarkMode ? 'rgba(20, 83, 45, 0.2)' : '#f0fdf4',
                                borderColor: isDarkMode ? '#166534' : '#bbf7d0'
                            }}
                        >
                            <p className="text-green-700 dark:text-green-300">{saveMessage}</p>
                        </div>
                    )}

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

                    {/* Birth Date - Read Only */}
                    <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide block mb-2">
                            {translate("birthDate")}
                        </label>
                        <div
                            className="px-4 py-3 rounded-xl border-2 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border-gray-100 dark:border-gray-600"
                        >
                            {user.birthDate
                                ? new Date(user.birthDate).toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                })
                                : "-"}
                        </div>
                    </div>

                    {/* Telegram Username - Editable */}
                    <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide block mb-2">
                            {translate("tgUsername")}
                        </label>
                        {isEditing ? (
                            <>
                                <input
                                    type="text"
                                    value={tgUsername}
                                    onChange={(e) => setTgUsername(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-blue-200 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30"
                                    style={{
                                        backgroundColor: isDarkMode ? '#374151' : '#ffffff',
                                        color: isDarkMode ? '#f3f4f6' : '#111827',
                                        borderColor: validationErrors.tgUsername
                                            ? (isDarkMode ? '#ef4444' : '#f87171')
                                            : (isDarkMode ? '#6b7280' : '#bfdbfe')
                                    }}
                                    placeholder="@username"
                                />
                                {validationErrors.tgUsername && (
                                    <p className="mt-1 text-sm text-red-500">{translate("tgUsernameError")}</p>
                                )}
                            </>
                        ) : (
                            <div className="px-4 py-3 rounded-xl border-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-100 dark:border-gray-600">
                                {user.tgUsername || "-"}
                            </div>
                        )}
                    </div>

                    {/* Phone Number - Editable */}
                    <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide block mb-2">
                            {translate("phoneNumber")}
                        </label>
                        {isEditing ? (
                            <div className="flex space-x-2">
                                <select
                                    value={countryCode}
                                    onChange={(e) => setCountryCode(e.target.value)}
                                    className="px-4 py-3 rounded-xl border-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-blue-200 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30"
                                    style={{ width: '120px' }}
                                >
                                    <option value="998">🇺🇿 +998</option>
                                    <option value="90">🇹🇷 +90</option>
                                </select>
                                <input
                                    type="tel"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                                    className="flex-1 px-4 py-3 rounded-xl border-2 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-blue-200 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30"
                                    placeholder="XX XXX XX XX"
                                    style={{
                                        backgroundColor: isDarkMode ? '#374151' : '#ffffff',
                                        color: isDarkMode ? '#f3f4f6' : '#111827',
                                        borderColor: validationErrors.phone
                                            ? (isDarkMode ? '#ef4444' : '#f87171')
                                            : (isDarkMode ? '#6b7280' : '#bfdbfe')
                                    }}
                                />
                            </div>
                        ) : (
                            <div className="px-4 py-3 rounded-xl border-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-100 dark:border-gray-600">
                                {user.phone ? `+${user.phone}` : "-"}
                            </div>
                        )}
                        {validationErrors.phone && (
                            <p className="mt-1 text-sm text-red-500">{translate("phoneNumberError")}</p>
                        )}
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

                    {/* Status - Read Only */}
                    <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide block mb-2">
                            {translate("active")}
                        </label>
                        <div className="px-4 py-3 rounded-xl border-2 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border-gray-100 dark:border-gray-600">
                            {user.isActive ? translate("active") : translate("inactive")}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4">
                        {isEditing ? (
                            <>
                                <button
                                    onClick={handleSave}
                                    disabled={mutationLoading}
                                    className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50"
                                    style={{
                                        backgroundColor: isDarkMode ? '#2563eb' : '#2563eb'
                                    }}
                                >
                                    {mutationLoading ? translate("loading") : translate("saveChanges") || "Save Changes"}
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="flex-1 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors duration-200"
                                    style={{
                                        backgroundColor: isDarkMode ? '#4b5563' : '#4b5563'
                                    }}
                                >
                                    {translate("cancel") || "Cancel"}
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={handleEdit}
                                className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
                                style={{
                                    backgroundColor: isDarkMode ? '#2563eb' : '#2563eb'
                                }}
                            >
                                {translate("edit") || "Edit"}
                            </button>
                        )}

                        <button
                            onClick={handleLogout}
                            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center gap-2"
                            style={{
                                backgroundColor: isDarkMode ? '#dc2626' : '#dc2626'
                            }}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            {translate("logout")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
