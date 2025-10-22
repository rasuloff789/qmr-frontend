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

export function Sidebar({
    activePage,
    onNavigate,
}) {

    return (
        <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
            {/* Logo/Brand */}
            <div className="p-6 border-b border-gray-200 items-center flex flex-col">
                <h2 className="text-green-800 font-bold">Qomar Qur'on Markazi</h2>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 p-4 space-y-1">
                <button
                    key="dashboard"
                    onClick={() => onNavigate("dashboard")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activePage === "dashboard"
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-50"
                        }`}>
                    <LayoutDashboard className="w-5 h-5" />
                    <span>{t("dashboard")}</span>
                </button>
                {checkUser(["root"]) && <button
                    key="admins"
                    onClick={() => onNavigate("admins")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activePage === "admins"
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-50"
                        }`}>
                    <Users className="w-5 h-5" />
                    <span>{t("admins")}</span>
                </button>}
                {checkUser(["root", "admin", "teacher"]) && <button
                    key="students"
                    onClick={() => onNavigate("students")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activePage === "students"
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-50"
                        }`}>
                    <GraduationCap className="w-5 h-5" />
                    <span>{t("students")}</span>
                </button>}
                {checkUser(["root", "admin", "teacher"]) && <button
                    key="courses"
                    onClick={() => onNavigate("courses")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activePage === "courses"
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-50"
                        }`}>
                    <BookOpen className="w-5 h-5" />
                    <span>{t("courses")}</span>
                </button>}
                {checkUser(["root", "admin"]) && <button
                    key="teachers"
                    onClick={() => onNavigate("teachers")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activePage === "teachers"
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-50"
                        }`}>
                    <UserCircle className="w-5 h-5" />
                    <span>{t("teachers")}</span>
                </button>}
                {checkUser(["root", "admin"]) && <button
                    key="payments"
                    onClick={() => onNavigate("payments")}
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
                    onClick={() => onNavigate("settings")}
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