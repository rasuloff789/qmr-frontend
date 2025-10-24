import { useTranslation } from "react-i18next";
import React, { memo, useMemo } from "react";

function PhoneNumberInput({
    countryCode,
    setCountryCode,
    phoneNumber,
    setPhoneNumber,
    errors,
}) {
    const { t: translate } = useTranslation();
    // Memoized placeholder calculation
    const placeholder = useMemo(() => {
        if (countryCode === "998") return "90 123 45 67"; // O'zbek raqam format
        if (countryCode === "90") return "501 234 56 78"; // Turkiya raqam format
        return "Phone number";
    }, [countryCode]);

    // Memoized input class calculation
    const inputClass = useMemo(() => `
        bg-gray-50 border text-gray-900 text-sm rounded-e-lg block w-full p-2.5
        ${errors?.phoneNumber
            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
            : "border-gray-300 focus:ring-primary-600 focus:border-primary-600"}
    `, [errors?.phoneNumber]);

    return (
        <div className="col-span-2">
            <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                {translate("phoneNumber")}
            </label>

            <div className="flex">
                <select
                    id="countries"
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-s-lg focus:ring-primary-600 focus:border-primary-600 block w-28 p-2.5"
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
                    placeholder={placeholder}
                    required
                />
            </div>

            {/* 🔥 Xato chiqadigan joy */}
            {errors?.phoneNumber && (
                <p className="mt-1 text-sm text-red-500">{translate("phoneNumberError")}</p>
            )}
        </div>
    );
}

// Memoized component for performance optimization
export default memo(PhoneNumberInput);
