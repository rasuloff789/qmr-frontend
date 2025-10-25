/**
 * Layout.jsx - Main Layout Component
 * 
 * Provides consistent layout structure for authenticated pages including:
 * - Sidebar navigation
 * - Header with back button and controls
 * - Dark mode toggle
 * - Language selector
 * - Main content area
 * 
 * @component
 */

import { useMemo, useCallback } from "react";
import { Sidebar } from "./Sidebar.jsx";
import { useTranslation } from "react-i18next";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDarkMode } from "../../contexts/DarkModeContext";

/**
 * Layout Component
 * 
 * Main wrapper for authenticated pages with sidebar and header controls.
 * 
 * @returns {JSX.Element} Layout with sidebar and content area
 */
export default function Layout() {
    const { t: translate, i18n } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    // Check if we're on an admin detail page (for showing back button)
    const isAdminDetailPage = useMemo(() => {
        return location.pathname.match(/^\/admin\/[^/]+$/);
    }, [location.pathname]);

    // Navigate back to admins list
    const handleBackClick = useCallback(() => {
        navigate('/admins');
    }, [navigate]);

    // Get page title based on current route
    const pageTitle = useMemo(() => {
        const path = location.pathname;
        if (path === "/") return translate("Dashboard");
        if (path === "/admins") return translate("Admins");
        if (path.startsWith("/admin/")) return translate("Admin Details");
        return translate("Qomar Qur'on Markazi");
    }, [location.pathname, translate]);

    // Memoize header styles for dark mode
    const headerStyles = useMemo(() => ({
        backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
        borderColor: isDarkMode ? '#374151' : '#f3f4f6',
        color: isDarkMode ? '#ffffff' : '#111827'
    }), [isDarkMode]);

    // Memoize container styles
    const containerStyles = useMemo(() => ({
        backgroundColor: isDarkMode ? '#111827' : '#f9fafb',
        color: isDarkMode ? '#ffffff' : '#111827'
    }), [isDarkMode]);

    // Memoize dark mode toggle button styles
    const toggleButtonStyles = useMemo(() => ({
        backgroundColor: isDarkMode ? '#374151' : '#e5e7eb',
        transform: 'translateZ(0)',
        willChange: 'transform, background-color'
    }), [isDarkMode]);

    return (
        <div
            className="flex w-screen h-screen bg-gray-50 dark:bg-gray-900"
            style={containerStyles}
        >
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header - Fixed at top - matches sidebar logo section height */}
                <div
                    className="sticky top-0 z-10 px-6 h-16 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-white dark:bg-gray-800 shadow-sm"
                    style={headerStyles}
                >
                    {/* Left side - Back button or Title */}
                    {isAdminDetailPage ? (
                        <button
                            onClick={handleBackClick}
                            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white font-medium py-1 px-3 rounded-md transition-colors duration-150 hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                            {translate("Back to Admins")}
                        </button>
                    ) : (
                        <div className="flex items-center">
                            <h1
                                className="text-lg font-medium text-gray-800 dark:text-white"
                                style={headerStyles}
                            >
                                {pageTitle}
                            </h1>
                        </div>
                    )}

                    {/* Right side - Dark mode toggle and language selector */}
                    <div className="flex items-center gap-3">
                        {/* Dark Mode Toggle */}
                        <div className="flex items-center gap-3">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                {isDarkMode ? 'Dark' : 'Light'}
                            </span>

                            {/* Sun/Moon Toggle Switch */}
                            <div className="relative">
                                <button
                                    onClick={toggleDarkMode}
                                    className="flex items-center rounded-full p-1 transition-all duration-500 ease-in-out hover:scale-110 active:scale-95 shadow-lg hover:shadow-xl"
                                    style={toggleButtonStyles}
                                    title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                                >
                                    {/* Sun Icon (Left) */}
                                    <div
                                        className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-500 ease-in-out transform"
                                        style={{
                                            backgroundColor: !isDarkMode ? '#fbbf24' : 'transparent',
                                            color: !isDarkMode ? '#92400e' : '#9ca3af',
                                            transform: !isDarkMode ? 'scale(1.1)' : 'scale(1)',
                                            boxShadow: !isDarkMode ? '0 0 20px rgba(251, 191, 36, 0.4)' : 'none',
                                            willChange: 'transform, background-color, box-shadow'
                                        }}
                                    >
                                        <svg
                                            className="w-4 h-4 transition-all duration-500 ease-in-out"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                            style={{
                                                transform: !isDarkMode ? 'rotate(0deg)' : 'rotate(180deg)',
                                                filter: !isDarkMode ? 'drop-shadow(0 0 4px rgba(251, 191, 36, 0.6))' : 'none'
                                            }}
                                        >
                                            <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                                        </svg>
                                    </div>

                                    {/* Moon Icon (Right) */}
                                    <div
                                        className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-500 ease-in-out transform"
                                        style={{
                                            backgroundColor: isDarkMode ? '#2563eb' : 'transparent',
                                            color: isDarkMode ? '#ffffff' : '#9ca3af',
                                            transform: isDarkMode ? 'scale(1.1)' : 'scale(1)',
                                            boxShadow: isDarkMode ? '0 0 20px rgba(37, 99, 235, 0.4)' : 'none',
                                            willChange: 'transform, background-color, box-shadow'
                                        }}
                                    >
                                        <svg
                                            className="w-4 h-4 transition-all duration-500 ease-in-out"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                            style={{
                                                transform: isDarkMode ? 'rotate(0deg)' : 'rotate(-180deg)',
                                                filter: isDarkMode ? 'drop-shadow(0 0 4px rgba(37, 99, 235, 0.6))' : 'none'
                                            }}
                                        >
                                            <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Language Selector */}
                        <select
                            value={i18n.language}
                            onChange={(e) => i18n.changeLanguage(e.target.value)}
                            className="h-8 px-3 py-1 text-sm border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md transition-colors focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="uz">{translate("🇺🇿 O'zbekcha")}</option>
                            <option value="en">{translate("🇬🇧 English")}</option>
                        </select>
                    </div>
                </div>

                {/* Main Content - Scrollable */}
                <main className="flex-1 overflow-y-auto overflow-x-auto px-6 py-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
