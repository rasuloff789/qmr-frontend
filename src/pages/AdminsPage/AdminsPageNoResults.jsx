import { useTranslation } from "react-i18next";
import { memo } from "react";
import SearchAdminInput from "../../components/SearchAdmin";
import AddAdmin from "../../components/AddAdmin";
import { useDarkMode } from "../../contexts/DarkModeContext";

function AdminsPageNoResults({ search, onSearchChange, onAddAdmin }) {
    const { t: translate } = useTranslation();
    const { isDarkMode } = useDarkMode();

    return (
        <div className="space-y-6">
            {/* Header with search and add button */}
            <div className="flex justify-between items-center">
                <SearchAdminInput search={search} AdminSearch={onSearchChange} />
                <AddAdmin onAdminAdded={onAddAdmin} />
            </div>

            {/* No results state */}
            <div
                className="flex flex-col items-center justify-center py-16 px-4"
                style={{
                    backgroundColor: isDarkMode ? '#111827' : '#ffffff'
                }}
            >
                <div
                    className="w-20 h-20 mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center"
                    style={{
                        backgroundColor: isDarkMode ? '#1f2937' : '#f3f4f6'
                    }}
                >
                    <svg
                        className="w-10 h-10 text-gray-400 dark:text-gray-500"
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
                <div className="text-center">
                    <h3
                        className="text-lg font-semibold text-gray-900 dark:text-white mb-2"
                        style={{
                            color: isDarkMode ? '#ffffff' : '#111827'
                        }}
                    >
                        {translate("noResultsFound")}
                    </h3>
                    <p
                        className="text-gray-600 dark:text-gray-400 mb-4"
                        style={{
                            color: isDarkMode ? '#d1d5db' : '#4b5563'
                        }}
                    >
                        {translate("noResultsDescription")}
                    </p>
                    <button
                        onClick={() => onSearchChange("")}
                        className="px-4 py-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                        style={{
                            color: isDarkMode ? '#60a5fa' : '#2563eb'
                        }}
                    >
                        {translate("clearSearch")}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default memo(AdminsPageNoResults);
