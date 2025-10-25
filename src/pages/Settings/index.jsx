import React from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useTranslation } from "react-i18next";
import { useDarkMode } from "../../contexts/DarkModeContext";
import { useNavigate } from "react-router-dom";

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

export default function Settings() {
    const { t: translate } = useTranslation();
    const { isDarkMode } = useDarkMode();
    const navigate = useNavigate();

    // Fetch user data
    const { data, loading, error } = useQuery(ME_QUERY, {
        errorPolicy: "all"
    });

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

                    {/* Info Message */}
                    <div
                        className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                        style={{
                            backgroundColor: isDarkMode ? 'rgba(30, 58, 138, 0.2)' : '#eff6ff',
                            borderColor: isDarkMode ? '#1e40af' : '#bfdbfe'
                        }}
                    >
                        <p className="text-blue-700 dark:text-blue-300 text-sm">
                            ℹ️ Profile editing is currently not available for root user accounts. Contact your administrator for profile changes.
                        </p>
                    </div>

                    {/* Logout Button */}
                    <div className="flex gap-4 pt-4">
                        <button
                            onClick={handleLogout}
                            className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
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
