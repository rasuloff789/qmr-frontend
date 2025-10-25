import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { useNavigate, useLocation } from 'react-router-dom';

export default function ComingSoonPage({ title, titleKey }) {
    const { t: translate } = useTranslation();
    const { isDarkMode } = useDarkMode();
    const navigate = useNavigate();
    const location = useLocation();

    // Use titleKey for translation, fallback to title prop
    const pageTitle = titleKey ? translate(titleKey) : title;

    // Check if this is the settings page
    const isSettingsPage = location.pathname === '/settings';

    // Handle logout
    const handleLogout = () => {
        // Clear authentication
        localStorage.removeItem("authentification");
        localStorage.removeItem("userRole");

        // Navigate to login and refresh the page to clear all state
        navigate("/login", { replace: true });
        window.location.reload();
    };

    return (
        <div
            className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900"
            style={{
                backgroundColor: isDarkMode ? '#111827' : '#f9fafb'
            }}
        >
            <div className="text-center">
                <div className="mb-8">
                    <div className="text-6xl mb-4">🚧</div>
                    <h1
                        className="text-3xl font-bold text-gray-800 dark:text-white mb-2"
                        style={{
                            color: isDarkMode ? '#ffffff' : '#1f2937'
                        }}
                    >
                        {pageTitle} {translate("page")}
                    </h1>
                    <p
                        className="text-gray-600 dark:text-gray-300 text-lg"
                        style={{
                            color: isDarkMode ? '#d1d5db' : '#4b5563'
                        }}
                    >
                        {translate("comingSoon") || "Coming Soon!"}
                    </p>
                </div>

                <div
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-md mx-auto"
                    style={{
                        backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                        color: isDarkMode ? '#ffffff' : '#1f2937'
                    }}
                >
                    <p
                        className="text-gray-700 dark:text-gray-300 mb-4"
                        style={{
                            color: isDarkMode ? '#d1d5db' : '#374151'
                        }}
                    >
                        {translate("workingOnIt") || "We're working hard to bring you this feature!"}
                    </p>
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>

                    {/* Exit/Logout Button - Only show on settings page */}
                    {isSettingsPage && (
                        <div className="mt-6">
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200"
                                style={{
                                    backgroundColor: isDarkMode ? '#dc2626' : '#dc2626'
                                }}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                <span>{translate("logout") || "Exit"}</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
