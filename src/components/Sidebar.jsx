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

export function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();

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
        <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
            {/* Logo/Brand */}
            <div className="p-5 border-b border-gray-200 items-center flex flex-col">
                <h2 className="text-green-800 font-bold h-6">Qomar Qur'on Markazi</h2>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 p-4 space-y-1">
                <button
                    data-key="dashboard"
                    onClick={handleClick}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activePage === "dashboard"
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-50"
                        }`}>
                    <LayoutDashboard className="w-5 h-5" />
                    <span>{t("dashboard")}</span>
                </button>
                {checkUser(["root"]) && <button
                    data-key="admins"
                    onClick={handleClick}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activePage === "admins"
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-50"
                        }`}>
                    <Users className="w-5 h-5" />
                    <span>{t("admins")}</span>
                </button>}
                {checkUser(["root", "admin", "teacher"]) && <button
                    data-key="students"
                    onClick={handleClick}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activePage === "students"
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-50"
                        }`}>
                    <GraduationCap className="w-5 h-5" />
                    <span>{t("students")}</span>
                </button>}
                {checkUser(["root", "admin", "teacher"]) && <button
                    data-key="courses"
                    onClick={handleClick}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activePage === "courses"
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-50"
                        }`}>
                    <BookOpen className="w-5 h-5" />
                    <span>{t("courses")}</span>
                </button>}
                {checkUser(["root", "admin"]) && <button
                    data-key="teachers"
                    onClick={handleClick}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activePage === "teachers"
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-50"
                        }`}>
                    <UserCircle className="w-5 h-5" />
                    <span>{t("teachers")}</span>
                </button>}
                {checkUser(["root", "admin"]) && <button
                    data-key="payments"
                    onClick={handleClick}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activePage === "payments"
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-50"
                        }`}>
                    <CreditCard className="w-5 h-5" />
                    <span>{t("payments")}</span>
                </button>}

            </nav>

            {/* Settings at bottom */}
            <div className="p-4 border-t border-gray-200">
                <button
                    data-key="settings"
                    onClick={handleClick}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activePage === "settings"
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-50"
                        }`}
                >
                    <Settings className="w-5 h-5" />
                    <span>Sozlamalar</span>
                </button>
            </div>
        </div>
    );
}