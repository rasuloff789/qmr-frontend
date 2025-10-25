import { t } from "i18next";
import { memo } from "react";
import { useDarkMode } from "../contexts/DarkModeContext";

function LoginErr({ onClose, message }) {
    const { isDarkMode } = useDarkMode();
    
    return <>
        <div
            className="fixed top-5 right-5 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-800"
            style={{
                backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                color: isDarkMode ? '#d1d5db' : '#6b7280'
            }}
            role="alert"
        >
            {/* Error icon */}
            <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
                </svg>
                <span className="sr-only">Error icon</span>
            </div>

            {/* Text */}
            <div className="ml-3 text-sm font-normal">
                {message || t("loginErr")}
            </div>

            {/* Close button */}
            <button
                onClick={onClose}
                type="button"
                className="w-8 h-8 flex items-center justify-center bg-white rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 ml-auto"
            >
                <span className="sr-only">Close menu</span>
                <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    </>
}

// Memoized component for performance optimization
export default memo(LoginErr);