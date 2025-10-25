import { useTranslation } from "react-i18next";
import React, { memo, useMemo } from "react";
import { useDarkMode } from "../../../contexts/DarkModeContext";

function PhoneNumberInput({
    countryCode,
    setCountryCode,
    phoneNumber,
    setPhoneNumber,
    errors,
}) {
    const { t: translate } = useTranslation();
    const { isDarkMode } = useDarkMode();
    // Memoized placeholder calculation
    const placeholder = useMemo(() => {
        if (countryCode === "998") return "90 123 45 67"; // O'zbek raqam format
        if (countryCode === "90") return "501 234 56 78"; // Turkiya raqam format
        return "Phone number";
    }, [countryCode]);

    // Memoized input class calculation
    const inputClass = useMemo(() => `
        bg-gray-50 dark:bg-gray-700 border text-gray-900 dark:text-white text-sm rounded-e-lg block w-full p-2.5
        ${errors?.phoneNumber
            ? "border-red-500 dark:border-red-400 focus:ring-red-500 dark:focus:ring-red-400 focus:border-red-500 dark:focus:border-red-400"
            : "border-gray-300 dark:border-gray-600 focus:ring-primary-600 dark:focus:ring-primary-500 focus:border-primary-600 dark:focus:border-primary-500"}
    `, [errors?.phoneNumber]);

    return (
        <div className="col-span-2">
            <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left"
                style={{
                    color: isDarkMode ? '#f3f4f6' : '#374151'
                }}
            >
                {translate("phoneNumber")}
            </label>

            <div className="flex">
                <select
                    id="countries"
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-s-lg focus:ring-primary-600 dark:focus:ring-primary-500 focus:border-primary-600 dark:focus:border-primary-500 block w-28 p-2.5"
                    style={{
                        backgroundColor: isDarkMode ? '#374151' : '#f9fafb',
                        color: isDarkMode ? '#f3f4f6' : '#111827',
                        borderColor: isDarkMode ? '#6b7280' : '#d1d5db'
                    }}
                >
                    <option value="998">🇺🇿 +998</option>
                    <option value="90">🇹🇷 +90</option>
                </select>

                <input
                    type="tel"
                    id="phone"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className={inputClass}
                    style={{
                        backgroundColor: isDarkMode ? '#374151' : '#ffffff',
                        color: isDarkMode ? '#f3f4f6' : '#111827',
                        borderColor: errors?.phoneNumber
                            ? (isDarkMode ? '#ef4444' : '#fca5a5')
                            : (isDarkMode ? '#6b7280' : '#d1d5db')
                    }}
                    placeholder={placeholder}
                    required
                />
            </div>

            {/* Error message */}
            {errors?.phoneNumber && (
                <p
                    className="mt-1 text-sm text-red-500 dark:text-red-400"
                    style={{
                        color: isDarkMode ? '#fca5a5' : '#dc2626'
                    }}
                >
                    {translate("phoneNumberError")}
                </p>
            )}
        </div>
    );
}

// Memoized component for performance optimization
export default memo(PhoneNumberInput);
