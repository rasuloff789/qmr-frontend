import { useTranslation } from "react-i18next";
import { memo } from "react";
import { useDarkMode } from "../contexts/DarkModeContext";

function AdminInputs({
    username,
    setUsername,
    password,
    setPassword,
    fullname,
    setFullname,
    tgUsername,
    setTgUsername,
    errors = {},
}) {
    const { t: translate } = useTranslation();
    const { isDarkMode } = useDarkMode();
    return (
        <>
            {/* Fullname */}
            <div>
                <label
                    htmlFor="fullname"
                    className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 text-left"
                    style={{
                        color: isDarkMode ? '#f3f4f6' : '#374151'
                    }}
                >
                    {translate("fullname")}
                </label>
                <input
                    type="text"
                    name="fullname"
                    id="fullname"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 ${errors.fullname
                        ? 'border-red-300 dark:border-red-500 focus:border-red-500 dark:focus:border-red-400 focus:ring-red-100 dark:focus:ring-red-900/30'
                        : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-200 dark:focus:ring-blue-900/30'
                        }`}
                    style={{
                        backgroundColor: isDarkMode ? '#374151' : '#ffffff',
                        color: isDarkMode ? '#f3f4f6' : '#111827',
                        borderColor: errors.fullname
                            ? (isDarkMode ? '#ef4444' : '#fca5a5')
                            : (isDarkMode ? '#6b7280' : '#d1d5db')
                    }}
                    placeholder={translate("typeFullname")}
                />
                {errors.fullname && (
                    <p
                        className="mt-1 text-sm text-red-600 dark:text-red-400"
                        style={{
                            color: isDarkMode ? '#fca5a5' : '#dc2626'
                        }}
                    >
                        {translate("fullnameError")}
                    </p>
                )}
            </div>

            {/* Username */}
            <div>
                <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 text-left"
                    style={{
                        color: isDarkMode ? '#f3f4f6' : '#374151'
                    }}
                >
                    {translate("username")}
                </label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 ${errors.username
                        ? 'border-red-300 dark:border-red-500 focus:border-red-500 dark:focus:border-red-400 focus:ring-red-100 dark:focus:ring-red-900/30'
                        : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-200 dark:focus:ring-blue-900/30'
                        }`}
                    style={{
                        backgroundColor: isDarkMode ? '#374151' : '#ffffff',
                        color: isDarkMode ? '#f3f4f6' : '#111827',
                        borderColor: errors.username
                            ? (isDarkMode ? '#ef4444' : '#fca5a5')
                            : (isDarkMode ? '#6b7280' : '#d1d5db')
                    }}
                    placeholder={translate("typeUsername")}
                />
                {errors.username && (
                    <p
                        className="mt-1 text-sm text-red-600 dark:text-red-400"
                        style={{
                            color: isDarkMode ? '#fca5a5' : '#dc2626'
                        }}
                    >
                        {translate("usernameError")}
                    </p>
                )}
            </div>

            {/* Password */}
            <div>
                <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 text-left"
                    style={{
                        color: isDarkMode ? '#f3f4f6' : '#374151'
                    }}
                >
                    {translate("password")}
                </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 ${errors.password
                        ? 'border-red-300 dark:border-red-500 focus:border-red-500 dark:focus:border-red-400 focus:ring-red-100 dark:focus:ring-red-900/30'
                        : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-200 dark:focus:ring-blue-900/30'
                        }`}
                    style={{
                        backgroundColor: isDarkMode ? '#374151' : '#ffffff',
                        color: isDarkMode ? '#f3f4f6' : '#111827',
                        borderColor: errors.password
                            ? (isDarkMode ? '#ef4444' : '#fca5a5')
                            : (isDarkMode ? '#6b7280' : '#d1d5db')
                    }}
                    placeholder={translate("typePassword")}
                />
                {errors.password && (
                    <p
                        className="mt-1 text-sm text-red-600 dark:text-red-400"
                        style={{
                            color: isDarkMode ? '#fca5a5' : '#dc2626'
                        }}
                    >
                        {translate("passwordError")}
                    </p>
                )}
            </div>

            {/* Telegram username */}
            <div>
                <label
                    htmlFor="tgUsername"
                    className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 text-left"
                    style={{
                        color: isDarkMode ? '#f3f4f6' : '#374151'
                    }}
                >
                    {translate("tgUsername")}
                </label>
                <input
                    type="text"
                    name="tgUsername"
                    id="tgUsername"
                    value={tgUsername}
                    onChange={(e) => setTgUsername(e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 ${errors.tgUsername
                        ? 'border-red-300 dark:border-red-500 focus:border-red-500 dark:focus:border-red-400 focus:ring-red-100 dark:focus:ring-red-900/30'
                        : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-200 dark:focus:ring-blue-900/30'
                        }`}
                    style={{
                        backgroundColor: isDarkMode ? '#374151' : '#ffffff',
                        color: isDarkMode ? '#f3f4f6' : '#111827',
                        borderColor: errors.tgUsername
                            ? (isDarkMode ? '#ef4444' : '#fca5a5')
                            : (isDarkMode ? '#6b7280' : '#d1d5db')
                    }}
                    placeholder={translate("typeTgUsername")}
                />
                {errors.tgUsername && (
                    <p
                        className="mt-1 text-sm text-red-600 dark:text-red-400"
                        style={{
                            color: isDarkMode ? '#fca5a5' : '#dc2626'
                        }}
                    >
                        {translate("tgUsernameError")}
                    </p>
                )}
            </div>
        </>
    );
}

// Memoized component for performance optimization
export default memo(AdminInputs);