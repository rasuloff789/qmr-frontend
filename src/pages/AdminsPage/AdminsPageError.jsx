import { useTranslation } from "react-i18next";
import { memo } from "react";

function AdminsPageError({ error, onRetry }) {
    const { t: translate } = useTranslation();

    return (
        <div className="flex items-center justify-center py-16">
            <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{translate("error")}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{error.message}</p>
                <button
                    onClick={onRetry}
                    className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                >
                    {translate("tryAgain")}
                </button>
            </div>
        </div>
    );
}

export default memo(AdminsPageError);
