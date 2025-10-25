import {
    LayoutDashboard,
    Users,
    GraduationCap,
    UserCircle,
    CreditCard,
    BookOpen,
    Book,
    Settings,
} from "lucide-react";
import checkUser from "../utils/checkUser";
import { t } from "i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { useDarkMode } from "../contexts/DarkModeContext";

export function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { isDarkMode } = useDarkMode();

    // ✅ active sahifani aniqlash - improved logic
    const getActivePage = () => {
        const path = location.pathname;

        // Handle specific routes
        if (path === "/") return "dashboard";
        if (path.startsWith("/admins")) return "admins";
        if (path.startsWith("/admin/")) return "admins"; // admin detail pages should highlight admins
        if (path.startsWith("/students")) return "students";
        if (path.startsWith("/courses")) return "courses";
        if (path.startsWith("/teachers")) return "teachers";
        if (path.startsWith("/payments")) return "payments";
        if (path.startsWith("/settings")) return "settings";

        // Fallback to first path segment
        return path.split("/")[1] || "dashboard";
    };

    const activePage = getActivePage();

    const handleClick = (e) => {
        const key = e.currentTarget.getAttribute("data-key");
        navigate(`/${key}`);
    };


    return (
        <div
            className="w-64 h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col"
            style={{
                backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                borderColor: isDarkMode ? '#374151' : '#e5e7eb'
            }}
        >
            {/* Logo/Brand */}
            <div className="p-5 border-b border-gray-200 dark:border-gray-700 items-center flex flex-col">
                <h2
                    className="text-green-800 dark:text-green-400 font-bold h-6"
                    style={{
                        color: isDarkMode ? '#10b981' : '#166534'
                    }}
                >
                    Qomar Qur'on Markazi
                </h2>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 p-4 space-y-1">
                <button
                    data-key="dashboard"
                    onClick={handleClick}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activePage === "dashboard"
                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                        }`}
                    style={{
                        backgroundColor: activePage === "dashboard"
                            ? (isDarkMode ? '#1e3a8a' : '#eff6ff')
                            : (isDarkMode ? 'transparent' : 'transparent'),
                        color: activePage === "dashboard"
                            ? (isDarkMode ? '#60a5fa' : '#2563eb')
                            : (isDarkMode ? '#d1d5db' : '#4b5563')
                    }}
                >
                    <LayoutDashboard className="w-5 h-5" />
                    <span>{t("dashboard")}</span>
                </button>
                {checkUser(["root"]) && <button
                    data-key="admins"
                    onClick={handleClick}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activePage === "admins"
                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                        }`}
                    style={{
                        backgroundColor: activePage === "admins"
                            ? (isDarkMode ? '#1e3a8a' : '#eff6ff')
                            : (isDarkMode ? 'transparent' : 'transparent'),
                        color: activePage === "admins"
                            ? (isDarkMode ? '#60a5fa' : '#2563eb')
                            : (isDarkMode ? '#d1d5db' : '#4b5563')
                    }}
                >
                    <Users className="w-5 h-5" />
                    <span>{t("admins")}</span>
                </button>}
                {checkUser(["root", "admin", "teacher"]) && <button
                    data-key="students"
                    onClick={handleClick}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activePage === "students"
                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                        }`}
                    style={{
                        backgroundColor: activePage === "students"
                            ? (isDarkMode ? '#1e3a8a' : '#eff6ff')
                            : (isDarkMode ? 'transparent' : 'transparent'),
                        color: activePage === "students"
                            ? (isDarkMode ? '#60a5fa' : '#2563eb')
                            : (isDarkMode ? '#d1d5db' : '#4b5563')
                    }}
                >
                    <GraduationCap className="w-5 h-5" />
                    <span>{t("students")}</span>
                </button>}
                {checkUser(["root", "admin", "teacher"]) && <button
                    data-key="courses"
                    onClick={handleClick}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activePage === "courses"
                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                        }`}
                    style={{
                        backgroundColor: activePage === "courses"
                            ? (isDarkMode ? '#1e3a8a' : '#eff6ff')
                            : (isDarkMode ? 'transparent' : 'transparent'),
                        color: activePage === "courses"
                            ? (isDarkMode ? '#60a5fa' : '#2563eb')
                            : (isDarkMode ? '#d1d5db' : '#4b5563')
                    }}
                >
                    <BookOpen className="w-5 h-5" />
                    <span>{t("courses")}</span>
                </button>}
                {checkUser(["root", "admin"]) && <button
                    data-key="teachers"
                    onClick={handleClick}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activePage === "teachers"
                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                        }`}
                    style={{
                        backgroundColor: activePage === "teachers"
                            ? (isDarkMode ? '#1e3a8a' : '#eff6ff')
                            : (isDarkMode ? 'transparent' : 'transparent'),
                        color: activePage === "teachers"
                            ? (isDarkMode ? '#60a5fa' : '#2563eb')
                            : (isDarkMode ? '#d1d5db' : '#4b5563')
                    }}
                >
                    <UserCircle className="w-5 h-5" />
                    <span>{t("teachers")}</span>
                </button>}
                {checkUser(["root", "admin"]) && <button
                    data-key="payments"
                    onClick={handleClick}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activePage === "payments"
                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                        }`}
                    style={{
                        backgroundColor: activePage === "payments"
                            ? (isDarkMode ? '#1e3a8a' : '#eff6ff')
                            : (isDarkMode ? 'transparent' : 'transparent'),
                        color: activePage === "payments"
                            ? (isDarkMode ? '#60a5fa' : '#2563eb')
                            : (isDarkMode ? '#d1d5db' : '#4b5563')
                    }}
                >
                    <CreditCard className="w-5 h-5" />
                    <span>{t("payments")}</span>
                </button>}

            </nav>

            {/* Settings at bottom */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <button
                    data-key="settings"
                    onClick={handleClick}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activePage === "settings"
                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                        }`}
                    style={{
                        backgroundColor: activePage === "settings"
                            ? (isDarkMode ? '#1e3a8a' : '#eff6ff')
                            : (isDarkMode ? 'transparent' : 'transparent'),
                        color: activePage === "settings"
                            ? (isDarkMode ? '#60a5fa' : '#2563eb')
                            : (isDarkMode ? '#d1d5db' : '#4b5563')
                    }}
                >
                    <Settings className="w-5 h-5" />
                    <span>Sozlamalar</span>
                </button>
            </div>
        </div>
    );
}