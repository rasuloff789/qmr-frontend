import React from 'react';
import { useTranslation } from 'react-i18next';

export default function ComingSoonPage({ title, titleKey }) {
    const { t: translate } = useTranslation();

    // Use titleKey for translation, fallback to title prop
    const pageTitle = titleKey ? translate(titleKey) : title;

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="text-center">
                <div className="mb-8">
                    <div className="text-6xl mb-4">🚧</div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        {pageTitle} {translate("page")}
                    </h1>
                    <p className="text-gray-600 text-lg">
                        {translate("comingSoon") || "Coming Soon!"}
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
                    <p className="text-gray-700 mb-4">
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
