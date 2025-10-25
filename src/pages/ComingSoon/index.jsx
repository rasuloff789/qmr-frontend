import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDarkMode } from '../../contexts/DarkModeContext';

export default function ComingSoonPage({ title, titleKey }) {
    const { t: translate } = useTranslation();
    const { isDarkMode } = useDarkMode();

    // Use titleKey for translation, fallback to title prop
    const pageTitle = titleKey ? translate(titleKey) : title;

    return (
        <div
            className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900"
            style={{
                backgroundColor: isDarkMode ? '#111827' : '#f9fafb'
            }}
        >
            <div className="text-center">
                <div className="mb-8">
                    <div className="text-6xl mb-4">🚧</div>
                    <h1
                        className="text-3xl font-bold text-gray-800 dark:text-white mb-2"
                        style={{
                            color: isDarkMode ? '#ffffff' : '#1f2937'
                        }}
                    >
                        {pageTitle} {translate("page")}
                    </h1>
                    <p
                        className="text-gray-600 dark:text-gray-300 text-lg"
                        style={{
                            color: isDarkMode ? '#d1d5db' : '#4b5563'
                        }}
                    >
                        {translate("comingSoon") || "Coming Soon!"}
                    </p>
                </div>

                <div
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-md mx-auto"
                    style={{
                        backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                        color: isDarkMode ? '#ffffff' : '#1f2937'
                    }}
                >
                    <p
                        className="text-gray-700 dark:text-gray-300 mb-4"
                        style={{
                            color: isDarkMode ? '#d1d5db' : '#374151'
                        }}
                    >
                        {translate("workingOnIt") || "We're working hard to bring you this feature!"}
                    </p>
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
