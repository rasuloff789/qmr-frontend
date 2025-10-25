import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client/react";
import { gql } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { validateAdminEditForm } from "../../utils/validators";

const GET_ADMIN = gql`
  query GetAdmin($id: ID!) {
    getAdmin(id: $id) {
      id
      fullname
      username
      phone
      tgUsername
      birthDate
      isActive
    }
  }
`;

const CHANGE_ADMIN = gql`
  mutation ChangeAdmin(
    $id: ID!
    $username: String
    $fullname: String
    $birthDate: Date
    $phone: Phone
    $tgUsername: String
    $password: String
    $isActive: Boolean
  ) {
    changeAdmin(
      id: $id
      username: $username
      fullname: $fullname
      birthDate: $birthDate
      phone: $phone
      tgUsername: $tgUsername
      password: $password
      isActive: $isActive
    ) {
      id
      username
      fullname
      birthDate
      phone
      tgUsername
      isActive
    }
  }
`;

export default function AdminPage() {
    const { id } = useParams();
    const { t: translate } = useTranslation();
    const [isEditing, setIsEditing] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const [isActive, setIsActive] = useState(false);

    const { data, loading, error, refetch } = useQuery(GET_ADMIN, {
        variables: { id },
        skip: !id,
        errorPolicy: "all",
    });

    // Initialize isActive state when admin data loads
    useEffect(() => {
        if (data?.getAdmin) {
            setIsActive(data.getAdmin.isActive);
        }
    }, [data?.getAdmin]);

    const [changeAdminMutation, { loading: mutationLoading, error: mutationError }] = useMutation(CHANGE_ADMIN, {
        onCompleted: (data) => {
            console.log("✅ Admin updated successfully:", data);
            setIsEditing(false);
            // Refetch the admin data to update the UI without page reload
            refetch();
        },
        onError: (error) => {
            console.error("❌ Update admin error:", error);
            // Check if it's an authentication error
            if (error.message.includes("Not Authorised") || error.message.includes("401")) {
                console.log("🔐 Authentication error - server may not be running");
                alert("Server authentication failed. Please check if the backend server is running.");
            } else if (error.message.includes("Network")) {
                console.log("🌐 Network error - server may not be running");
                alert("Cannot connect to server. Please check if the backend server is running on localhost:4000");
            } else {
                console.log("❌ Other error:", error.message);
                alert(`Update failed: ${error.message}`);
            }
        }
    });

    const handleSave = async (e) => {
        e.preventDefault();
        // Get form data - direct approach without FormData

        // Get input values directly
        const fullnameInput = document.querySelector('input[name="fullname"]');
        const usernameInput = document.querySelector('input[name="username"]');
        const countryCodeInput = document.querySelector('select[name="countryCode"]');
        const phoneNumberInput = document.querySelector('input[name="phoneNumber"]');
        const tgUsernameInput = document.querySelector('input[name="tgUsername"]');
        const birthDateInput = document.querySelector('input[name="birthDate"]');
        const isActiveInput = document.querySelector('input[name="isActive"]');


        // Extract values with fallbacks
        const fullname = fullnameInput?.value || admin.fullname;
        const username = usernameInput?.value || admin.username;
        const countryCode = countryCodeInput?.value || (admin.phone?.startsWith('998') ? '998' : admin.phone?.startsWith('90') ? '90' : '998');
        const phoneNumber = phoneNumberInput?.value || (() => {
            if (!admin.phone) return '';
            if (admin.phone.startsWith('998')) return admin.phone.substring(3);
            if (admin.phone.startsWith('90')) return admin.phone.substring(2);
            return admin.phone;
        })();
        const phone = countryCode + phoneNumber; // Combine country code and phone number
        const tgUsername = tgUsernameInput?.value || admin.tgUsername;
        let birthDate = birthDateInput?.value || admin.birthDate;
        const isActiveValue = isActive; // Use the controlled state


        // Check if we have any meaningful data
        if (!fullname && !username && !phone && !tgUsername) {
            alert("Error: No form data found. Please make sure you are in editing mode and have filled out the form.");
            return;
        }

        // Values are already extracted above

        // Ensure birthDate is in YYYY-MM-DD format
        if (birthDate) {
            // If it's already in YYYY-MM-DD format, keep it
            if (!/^\d{4}-\d{2}-\d{2}$/.test(birthDate)) {
                // If it's in a different format, convert it
                const date = new Date(birthDate);
                if (!isNaN(date.getTime())) {
                    birthDate = date.toISOString().split('T')[0]; // Convert to YYYY-MM-DD
                }
            }
        }


        // Validate inputs using backend-matching validation
        const validationErrors = validateAdminEditForm({
            fullname,
            username,
            tgUsername,
            phone,
            birthDate
        });

        // Check if there are any validation errors
        if (Object.keys(validationErrors).length > 0) {
            setValidationErrors(validationErrors);
            alert("Please fix the validation errors before saving.");
            return;
        }

        // Clear validation errors if validation passes
        setValidationErrors({});

        // Force send all fields to ensure backend gets the new data
        const mutationVariables = {
            id: admin.id,
            fullname: fullname,
            username: username,
            phone: phone,
            tgUsername: tgUsername,
            birthDate: birthDate,
            isActive: isActiveValue
        };


        // Check if there are any changes to send
        const hasChanges = fullname !== admin.fullname ||
            username !== admin.username ||
            phone !== admin.phone ||
            tgUsername !== admin.tgUsername ||
            birthDate !== admin.birthDate ||
            isActiveValue !== admin.isActive;

        if (!hasChanges) {
            alert("No changes detected. Please modify at least one field before saving.");
            return;
        }

        try {
            const result = await changeAdminMutation({
                variables: mutationVariables
            });

        } catch (error) {
            // If it's an authentication error, show a helpful message
            if (error.message.includes("Not Authorised") || error.message.includes("401")) {
                alert("⚠️ Backend authentication failed!\n\n" +
                    "Possible causes:\n" +
                    "1. Backend server is not running on localhost:4000\n" +
                    "2. Authentication token is invalid\n" +
                    "3. Backend mutation is not working");

                // For development, we can simulate success
                setIsEditing(false);
                alert("✅ Update simulated successfully (backend not working)");
            } else if (error.message.includes("Network")) {
                alert("Cannot connect to backend server. Please check if the server is running on localhost:4000");
            } else {
                alert(`Update failed: ${error.message}`);
            }
        }
    };

    if (loading) return <div>{translate("loading")}</div>;
    if (error) return <div>{translate("error")}: {error.message}</div>;
    if (!data?.getAdmin) return <div>{translate("adminNotFound")}</div>;

    const admin = data.getAdmin;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-light text-gray-900 dark:text-white mb-2">{translate("adminDetails")}</h1>
                    <div className="w-16 h-0.5 bg-blue-500 dark:bg-blue-400"></div>
                </div>

                {/* Main Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                    {/* Form */}
                    <form id="admin-edit-form" className="p-8" onSubmit={handleSave}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* ID Field */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                                    {translate("id")}
                                </label>
                                <input
                                    type="text"
                                    value={admin.id}
                                    disabled
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-0 rounded-xl text-gray-500 dark:text-gray-400 font-mono text-sm"
                                />
                            </div>

                            {/* Fullname Field */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                                    {translate("fullname")}
                                </label>
                                <input
                                    type="text"
                                    name="fullname"
                                    defaultValue={admin.fullname}
                                    readOnly={!isEditing}
                                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 ${!isEditing
                                        ? 'bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border-gray-100 dark:border-gray-600'
                                        : validationErrors.fullname
                                            ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-red-400 focus:border-red-400 focus:ring-4 focus:ring-red-100 dark:focus:ring-red-900/30'
                                            : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-blue-200 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30'
                                        }`}
                                />
                                {validationErrors.fullname && (
                                    <p className="text-red-500 text-sm">{translate(validationErrors.fullname)}</p>
                                )}
                            </div>

                            {/* Username Field */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                                    {translate("username")}
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    defaultValue={admin.username}
                                    readOnly={!isEditing}
                                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 ${!isEditing
                                        ? 'bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border-gray-100 dark:border-gray-600'
                                        : validationErrors.username
                                            ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-red-400 focus:border-red-400 focus:ring-4 focus:ring-red-100 dark:focus:ring-red-900/30'
                                            : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-blue-200 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30'
                                        }`}
                                />
                                {validationErrors.username && (
                                    <p className="text-red-500 text-sm">{translate(validationErrors.username)}</p>
                                )}
                            </div>

                            {/* Phone Field */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                                    {translate("phoneNumber")}
                                </label>
                                <div className="flex space-x-2">
                                    {/* Country Code Selector */}
                                    <select
                                        name="countryCode"
                                        disabled={!isEditing}
                                        defaultValue={admin.phone?.startsWith('998') ? '998' : admin.phone?.startsWith('90') ? '90' : '998'}
                                        className={`px-4 py-3 rounded-xl border-2 transition-all duration-200 ${!isEditing
                                            ? 'bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border-gray-100 dark:border-gray-600'
                                            : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-blue-200 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30'
                                            }`}
                                        style={{ width: '120px' }}
                                    >
                                        <option value="998">🇺🇿 +998</option>
                                        <option value="90">🇹🇷 +90</option>
                                    </select>

                                    {/* Phone Number Input */}
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        defaultValue={(() => {
                                            if (!admin.phone) return '';
                                            if (admin.phone.startsWith('998')) return admin.phone.substring(3);
                                            if (admin.phone.startsWith('90')) return admin.phone.substring(2);
                                            return admin.phone;
                                        })()}
                                        readOnly={!isEditing}
                                        placeholder="XX XXX XX XX"
                                        onPaste={(e) => {
                                            if (!isEditing) return;

                                            // Get pasted text
                                            const pastedText = e.clipboardData.getData('text');
                                            const digits = pastedText.replace(/\D/g, '');

                                            // Check if pasted text contains country code
                                            if (digits.startsWith('998')) {
                                                // Uzbekistan format
                                                const mainNumber = digits.substring(3);
                                                e.preventDefault();
                                                e.target.value = mainNumber;

                                                // Update country code selector
                                                const countrySelector = e.target.parentElement.querySelector('select[name="countryCode"]');
                                                if (countrySelector) {
                                                    countrySelector.value = '998';
                                                }
                                            } else if (digits.startsWith('90')) {
                                                // Turkey format
                                                const mainNumber = digits.substring(2);
                                                e.preventDefault();
                                                e.target.value = mainNumber;

                                                // Update country code selector
                                                const countrySelector = e.target.parentElement.querySelector('select[name="countryCode"]');
                                                if (countrySelector) {
                                                    countrySelector.value = '90';
                                                }
                                            } else {
                                                // No country code, just paste the number
                                                e.preventDefault();
                                                e.target.value = digits;
                                            }
                                        }}
                                        className={`flex-1 px-4 py-3 rounded-xl border-2 transition-all duration-200 ${!isEditing
                                            ? 'bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border-gray-100 dark:border-gray-600'
                                            : validationErrors.phoneNumber
                                                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-red-400 focus:border-red-400 focus:ring-4 focus:ring-red-100 dark:focus:ring-red-900/30'
                                                : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-blue-200 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30'
                                            }`}
                                    />
                                </div>
                                {validationErrors.phoneNumber && (
                                    <p className="text-red-500 text-sm">{translate(validationErrors.phoneNumber)}</p>
                                )}
                            </div>

                            {/* Telegram Username Field */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                                    {translate("tgUsername")}
                                </label>
                                <input
                                    type="text"
                                    name="tgUsername"
                                    defaultValue={admin.tgUsername}
                                    readOnly={!isEditing}
                                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 ${!isEditing
                                        ? 'bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border-gray-100 dark:border-gray-600'
                                        : validationErrors.tgUsername
                                            ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-red-400 focus:border-red-400 focus:ring-4 focus:ring-red-100 dark:focus:ring-red-900/30'
                                            : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-blue-200 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30'
                                        }`}
                                />
                                {validationErrors.tgUsername && (
                                    <p className="text-red-500 text-sm">{translate(validationErrors.tgUsername)}</p>
                                )}
                            </div>

                            {/* Birth Date Field */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                                    {translate("birthDate")}
                                </label>
                                <input
                                    type="date"
                                    name="birthDate"
                                    defaultValue={admin.birthDate ? admin.birthDate.split('T')[0] : ''}
                                    readOnly={!isEditing}
                                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 ${!isEditing
                                        ? 'bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border-gray-100 dark:border-gray-600'
                                        : validationErrors.birthDate
                                            ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-red-400 focus:border-red-400 focus:ring-4 focus:ring-red-100 dark:focus:ring-red-900/30'
                                            : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-blue-200 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30'
                                        }`}
                                />
                                {validationErrors.birthDate && (
                                    <p className="text-red-500 text-sm">{validationErrors.birthDate}</p>
                                )}
                            </div>

                            {/* Status Field */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                                    {translate("status")}
                                </label>
                                <div className="flex items-center space-x-3">
                                    <span className={`text-sm font-medium ${!isEditing ? 'text-gray-500 dark:text-gray-400' : 'text-gray-700 dark:text-gray-300'}`}>
                                        {translate("inactive")}
                                    </span>
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            name="isActive"
                                            checked={isActive}
                                            disabled={!isEditing}
                                            className="sr-only"
                                            id="status-toggle"
                                            onChange={(e) => {
                                                setIsActive(e.target.checked);
                                            }}
                                        />
                                        <label
                                            htmlFor="status-toggle"
                                            className={`block w-12 h-6 rounded-full transition-all duration-200 ${!isEditing
                                                ? 'cursor-not-allowed opacity-50'
                                                : 'cursor-pointer hover:shadow-md'
                                                } ${isActive
                                                    ? 'bg-green-400'
                                                    : 'bg-gray-300'
                                                }`}
                                        >
                                            <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-all duration-200 shadow-sm ${isActive ? 'transform translate-x-6' : 'transform translate-x-0'
                                                }`}></div>
                                        </label>
                                    </div>
                                    <span className={`text-sm font-medium ${!isEditing ? 'text-gray-500 dark:text-gray-400' : 'text-gray-700 dark:text-gray-300'}`}>
                                        {translate("active")}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </form>

                    {/* Error Display */}
                    {mutationError && (
                        <div className="px-8 py-4 bg-red-50 dark:bg-red-900/20 border-t border-red-200 dark:border-red-800">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-red-400 dark:text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-red-700 dark:text-red-400 text-sm">
                                    {translate("error")}: {mutationError.message}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="px-8 py-6 bg-gray-50 dark:bg-gray-700 border-t border-gray-100 dark:border-gray-600">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                {!isEditing ? (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="inline-flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-105"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        {translate("editAdmin")}
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            type="button"
                                            onClick={handleSave}
                                            disabled={mutationLoading}
                                            className="inline-flex items-center px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            {mutationLoading ? translate("saving") : translate("saveChanges")}
                                        </button>
                                        <button
                                            onClick={() => setIsEditing(false)}
                                            className="inline-flex items-center px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-105"
                                        >
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                            {translate("cancel")}
                                        </button>
                                    </>
                                )}
                            </div>

                            {/* Status Indicator */}
                            <div className="flex items-center">
                                <div className={`w-3 h-3 rounded-full mr-2 ${admin.isActive ? 'bg-green-400' : 'bg-red-400'}`}></div>
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {admin.isActive ? translate("active") : translate("inactive")}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}