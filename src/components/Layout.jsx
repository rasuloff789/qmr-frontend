import { useState } from "react";
import { Sidebar } from "./Sidebar.jsx";
import { useTranslation } from "react-i18next";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function Layout() {
    const { t: translate, i18n } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();

    console.log("🔍 Layout - Current path:", location.pathname);

    // Check if we're on an admin detail page
    const isAdminDetailPage = location.pathname.match(/^\/admin\/[^/]+$/);

    const handleBackClick = () => {
        console.log("🔍 Layout - Back button clicked");
        // Navigate back to admins list
        navigate('/admins');
    };

    return (
        <div className="flex w-screen h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 overflow-y-auto overflow-x-auto">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white">
                    {/* Back button for /admin/:id route */}
                    {isAdminDetailPage ? (
                        <button
                            onClick={handleBackClick}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-medium py-1 px-3 rounded-md transition-colors duration-150 hover:bg-gray-50"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                            {translate("Back to Admins")}
                        </button>
                    ) : (
                        <div className="flex items-center">
                            <h1 className="text-lg font-medium text-gray-800">
                                {location.pathname === "/" ? translate("Dashboard") :
                                    location.pathname === "/admins" ? translate("Admins") :
                                        location.pathname.startsWith("/admin/") ? translate("Admin Details") :
                                            translate("Qomar Qur'on Markazi")}
                            </h1>
                        </div>
                    )}
                    <select
                        value={i18n.language}
                        onChange={(e) => i18n.changeLanguage(e.target.value)}
                        className="h-8 px-3 py-1 text-sm border border-gray-200 bg-white text-gray-600 rounded-md transition-colors focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="uz">{translate("🇺🇿 O'zbekcha")}</option>
                        <option value="en">{translate("🇬🇧 English")}</option>
                    </select>
                </div>
                <main className="flex-1 overflow-y-auto px-6 py-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
