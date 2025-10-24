import { useTranslation } from "react-i18next";
import { memo } from "react";

function AdminsPageLoading() {
    const { t: translate } = useTranslation();

    return (
        <div className="flex items-center justify-center py-16">
            <div className="flex items-center space-x-2">
                <svg className="animate-spin w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-gray-600 dark:text-gray-400">{translate("loading")}</span>
            </div>
        </div>
    );
}

export default memo(AdminsPageLoading);
