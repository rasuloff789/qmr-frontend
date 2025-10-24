import { t } from "i18next";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { memo } from "react";

function DateTimeInput({ birthDate, setBirthDate }) {

    return (
        <div className="col-span-2">
            <label
                htmlFor="datetime"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                {t("birthDate")}
            </label>

            <div className="relative">
                {/* 📅 Kalendar input */}
                <DatePicker
                    selected={birthDate}
                    onChange={(date) => setBirthDate(date)}
                    dateFormat="dd/MM/yyyy"
                    placeholderText={t("chooseBDate")}
                    maxDate={new Date()} // bugungi kungacha
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                    focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-10
                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                />

                {/* 📆 Kalendar ikonkasi */}
                <svg
                    className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2
                        2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                </svg>
            </div>
        </div>
    );
}

// Memoized component for performance optimization
export default memo(DateTimeInput);
