import { useTranslation } from "react-i18next";
import { memo } from "react";
import AddAdmin from "../../../../components/admin/AdminForm/AddAdmin";
import { useDarkMode } from "../../../../contexts/DarkModeContext";

function AdminsPageNoAdmins({ onAddAdmin }) {
    const { t: translate } = useTranslation();
    const { isDarkMode } = useDarkMode();

    return (
        <div
            className="flex flex-col items-center justify-center py-16 px-4"
            style={{
                backgroundColor: isDarkMode ? '#111827' : '#ffffff'
            }}
        >
            {/* Empty State Icon */}
            <div
                className="w-24 h-24 mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center"
                style={{
                    backgroundColor: isDarkMode ? '#1f2937' : '#f3f4f6'
                }}
            >
                <svg
                    className="w-12 h-12 text-gray-400 dark:text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    style={{
                        color: isDarkMode ? '#6b7280' : '#9ca3af'
                    }}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </div>

            {/* Empty State Content */}
            <div className="text-center max-w-md">
                <h3
                    className="text-xl font-semibold text-gray-900 dark:text-white mb-2"
                    style={{
                        color: isDarkMode ? '#ffffff' : '#111827'
                    }}
                >
                    {translate("noAdminsFound")}
                </h3>
                <p
                    className="text-gray-600 dark:text-gray-400 mb-8"
                    style={{
                        color: isDarkMode ? '#d1d5db' : '#4b5563'
                    }}
                >
                    {translate("noAdminsDescription")}
                </p>

                {/* Add Admin Button */}
                <div className="flex justify-center">
                    <AddAdmin onAdminAdded={onAddAdmin} />
                </div>
            </div>
        </div>
    );
}

export default memo(AdminsPageNoAdmins);
