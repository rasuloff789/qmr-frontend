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
        <div className="w-full max-w-md">
            {/* Logo/Title Section */}
            <div className="text-center mb-8">
                <h1
                    className="text-3xl font-light mb-2"
                    style={{
                        color: isDarkMode ? '#10b981' : '#166534'
                    }}
                >
                    Qomar Qur'on Markazi
                </h1>
                <p
                    className="text-sm"
                    style={{
                        color: isDarkMode ? '#9ca3af' : '#6b7280'
                    }}
                >
                    {t("welcome") || "Welcome"}
                </p>
            </div>

            {/* Login Card */}
            <div
                className="p-8 rounded-2xl shadow-xl backdrop-blur-sm border"
                style={{
                    backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.9)' : 'rgba(255, 255, 255, 0.95)',
                    borderColor: isDarkMode ? 'rgba(75, 85, 99, 0.3)' : 'rgba(209, 213, 219, 0.3)'
                }}
            >
                <h2
                    className="text-xl font-light text-center mb-8"
                    style={{
                        color: isDarkMode ? '#f3f4f6' : '#1f2937'
                    }}
                >
                    {t("login")}
                </h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Username */}
                    <div className="space-y-2">
                        <input
                            type="text"
                            value={username}
                            id="username"
                            placeholder={t("username")}
                            onChange={handleUsernameChange}
                            className="w-full px-4 py-3 border-0 border-b-2 bg-transparent rounded-t-lg focus:outline-none focus:ring-0 transition-all duration-200"
                            style={{
                                color: isDarkMode ? '#f3f4f6' : '#111827',
                                borderBottomColor: isDarkMode ? '#4b5563' : '#d1d5db'
                            }}
                            onFocus={(e) => {
                                e.target.style.borderBottomColor = '#10b981';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderBottomColor = isDarkMode ? '#4b5563' : '#d1d5db';
                            }}
                            required
                            disabled={loading}
                        />
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <input
                            type="password"
                            id="password"
                            value={password}
                            placeholder={t("password")}
                            onChange={handlePasswordChange}
                            className="w-full px-4 py-3 border-0 border-b-2 bg-transparent rounded-t-lg focus:outline-none focus:ring-0 transition-all duration-200"
                            style={{
                                color: isDarkMode ? '#f3f4f6' : '#111827',
                                borderBottomColor: isDarkMode ? '#4b5563' : '#d1d5db'
                            }}
                            onFocus={(e) => {
                                e.target.style.borderBottomColor = '#10b981';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderBottomColor = isDarkMode ? '#4b5563' : '#d1d5db';
                            }}
                            required
                            disabled={loading}
                        />
                    </div>

                    {/* Submit button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                        style={{
                            backgroundColor: isDarkMode ? '#10b981' : '#16a34a'
                        }}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                {t("loading")}
                            </span>
                        ) : (
                            t("login")
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}

// Memoized component for performance optimization
export default memo(LogInForm);