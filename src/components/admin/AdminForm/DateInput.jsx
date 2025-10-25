import { useTranslation } from "react-i18next";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { memo } from "react";
import { useDarkMode } from "../../../contexts/DarkModeContext";

function DateTimeInput({ birthDate, setBirthDate, error }) {
    const { t: translate } = useTranslation();
    const { isDarkMode } = useDarkMode();

    return (
        <div>
            <label
                htmlFor="datetime"
                className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 text-left"
                style={{
                    color: isDarkMode ? '#f3f4f6' : '#374151'
                }}
            >
                {translate("birthDate")}
            </label>

            <DatePicker
                selected={birthDate}
                onChange={(date) => setBirthDate(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText={translate("chooseBDate")}
                maxDate={new Date()}
                className={`w-full px-3 py-2 border rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 ${error
                    ? 'border-red-300 dark:border-red-500 focus:border-red-500 dark:focus:border-red-400 focus:ring-red-100 dark:focus:ring-red-900/30'
                    : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-200 dark:focus:ring-blue-900/30'
                    }`}
                wrapperClassName="w-full"
                style={{
                    backgroundColor: isDarkMode ? '#374151' : '#ffffff',
                    color: isDarkMode ? '#f3f4f6' : '#111827',
                    borderColor: error
                        ? (isDarkMode ? '#ef4444' : '#fca5a5')
                        : (isDarkMode ? '#6b7280' : '#d1d5db')
                }}
            />

            {error && (
                <p
                    className="mt-1 text-sm text-red-600 dark:text-red-400"
                    style={{
                        color: isDarkMode ? '#fca5a5' : '#dc2626'
                    }}
                >
                    {translate(error)}
                </p>
            )}
        </div>
    );
}

// Memoized component for performance optimization
export default memo(DateTimeInput);