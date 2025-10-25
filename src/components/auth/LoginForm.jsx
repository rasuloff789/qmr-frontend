import { t } from "i18next";
import { memo, useCallback } from "react";
import { useDarkMode } from "../../contexts/DarkModeContext";

function LogInForm({ handleSubmit, username, setUsername, password, setPassword, loading }) {
    const { isDarkMode } = useDarkMode();
    
    // Memoized change handlers for performance
    const handleUsernameChange = useCallback((e) => {
        setUsername(e.target.value);
    }, [setUsername]);

    const handlePasswordChange = useCallback((e) => {
        setPassword(e.target.value);
    }, [setPassword]);

    return (
        <div 
            className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md"
            style={{
                backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                color: isDarkMode ? '#ffffff' : '#111827'
            }}
        >
            <h2 
                className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white"
                style={{
                    color: isDarkMode ? '#ffffff' : '#1f2937'
                }}
            >
                {t("login")}
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Username */}
                <div>
                    <label 
                        className="block text-gray-700 dark:text-gray-300 mb-1" 
                        htmlFor="username"
                        style={{
                            color: isDarkMode ? '#d1d5db' : '#374151'
                        }}
                    >
                        {t("username")}
                    </label>
                    <input
                        type="text"
                        value={username}
                        id="username"
                        placeholder={t("inputUsername")}
                        onChange={handleUsernameChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                        style={{
                            backgroundColor: isDarkMode ? '#374151' : '#ffffff',
                            color: isDarkMode ? '#f3f4f6' : '#111827',
                            borderColor: isDarkMode ? '#6b7280' : '#d1d5db'
                        }}
                        required
                        disabled={loading}
                    />
                </div>

                {/* Password */}
                <div>
                    <label 
                        className="block text-gray-700 dark:text-gray-300 mb-1" 
                        htmlFor="password"
                        style={{
                            color: isDarkMode ? '#d1d5db' : '#374151'
                        }}
                    >
                        {t("password")}
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        placeholder={t("inputPassword")}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                        style={{
                            backgroundColor: isDarkMode ? '#374151' : '#ffffff',
                            color: isDarkMode ? '#f3f4f6' : '#111827',
                            borderColor: isDarkMode ? '#6b7280' : '#d1d5db'
                        }}
                        required
                        disabled={loading}
                    />
                </div>

                {/* Submit button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? t("loading") : t("login")}
                </button>
            </form>
        </div>
    );
}

// Memoized component for performance optimization
export default memo(LogInForm);