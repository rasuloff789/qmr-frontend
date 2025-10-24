import { t } from "i18next";
import { useState, useReducer, useCallback, useMemo } from "react";
import PhoneNumberInput from "./PhoneNumberInput.jsx";
import AdminInputs from "./AdminInputs.AddAdminModal.jsx";
import AddAdminFormHeader from "./FormHeader.AddAdminModal.jsx";
import DateTimeInput from "./DateTimeInput.AddAdminModal.jsx";
import { validateAdminInputs } from "../utils/validators.js";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

// GraphQL mutation
const ADD_ADMIN = gql`
  mutation AddAdmin(
    $username: String!
    $password: String!
    $fullname: String!
    $tgUsername: String!
    $birthDate: Date!
    $phone: Phone!
  ) {
    addAdmin(
      username: $username
      password: $password
      fullname: $fullname
      tgUsername: $tgUsername
      birthDate: $birthDate
      phone: $phone
    ) {
      id
      username
      fullname
    }
  }
`;

// Form state reducer for better state management
const formReducer = (state, action) => {
    switch (action.type) {
        case 'SET_FIELD':
            return { ...state, [action.field]: action.value };
        case 'SET_ERRORS':
            return { ...state, errors: action.errors };
        case 'CLEAR_FORM':
            return {
                username: "",
                fullname: "",
                password: "",
                tgUsername: "",
                countryCode: "90",
                phoneNumber: "",
                birthDate: null,
                errors: {}
            };
        case 'SET_MODAL':
            return { ...state, open: action.open };
        default:
            return state;
    }
};

// Initial form state
const initialFormState = {
    open: false,
    username: "",
    fullname: "",
    password: "",
    tgUsername: "",
    countryCode: "90",
    phoneNumber: "",
    birthDate: null,
    errors: {}
};

export default function AddAdmin() {
    const [formState, dispatch] = useReducer(formReducer, initialFormState);

    // Mutation
    const [addAdminMutation, { loading, error }] = useMutation(ADD_ADMIN);

    // Memoized field setters for performance
    const setField = useCallback((field, value) => {
        dispatch({ type: 'SET_FIELD', field, value });
    }, []);

    const setModal = useCallback((open) => {
        dispatch({ type: 'SET_MODAL', open });
    }, []);

    // Optimized form submission with proper error handling
    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        // Validate form inputs
        const newErrors = validateAdminInputs({
            fullname: formState.fullname,
            username: formState.username,
            password: formState.password,
            tgUsername: formState.tgUsername,
            phoneNumber: formState.phoneNumber,
        });

        dispatch({ type: 'SET_ERRORS', errors: newErrors });

        // Return early if validation fails
        if (Object.keys(newErrors).length > 0) {
            return;
        }

        try {
            await addAdminMutation({
                variables: {
                    username: formState.username,
                    password: formState.password,
                    fullname: formState.fullname,
                    tgUsername: formState.tgUsername,
                    birthDate: formState.birthDate?.toISOString().split("T")[0], // YYYY-MM-DD format
                    phone: `${formState.countryCode}${formState.phoneNumber}`,
                },
            });

            // Clear form and close modal on success
            dispatch({ type: 'CLEAR_FORM' });
            dispatch({ type: 'SET_MODAL', open: false });
        } catch (err) {
            console.error("Add admin error:", err.message);
            // Handle error state if needed
        }
    }, [formState, addAdminMutation]);

    // Memoized components for performance
    const memoizedAdminInputs = useMemo(() => (
        <AdminInputs
            username={formState.username}
            password={formState.password}
            fullname={formState.fullname}
            tgUsername={formState.tgUsername}
            setFullname={(value) => setField('fullname', value)}
            setPassword={(value) => setField('password', value)}
            setTgUsername={(value) => setField('tgUsername', value)}
            setUsername={(value) => setField('username', value)}
            errors={formState.errors}
        />
    ), [formState.username, formState.password, formState.fullname, formState.tgUsername, formState.errors, setField]);

    const memoizedPhoneInput = useMemo(() => (
        <PhoneNumberInput
            countryCode={formState.countryCode}
            setCountryCode={(value) => setField('countryCode', value)}
            phoneNumber={formState.phoneNumber}
            setPhoneNumber={(value) => setField('phoneNumber', value)}
            errors={formState.errors}
        />
    ), [formState.countryCode, formState.phoneNumber, formState.errors, setField]);

    const memoizedDateTimeInput = useMemo(() => (
        <DateTimeInput
            birthDate={formState.birthDate}
            setBirthDate={(value) => setField('birthDate', value)}
        />
    ), [formState.birthDate, setField]);

    return (
        <>
            <button
                onClick={() => setModal(true)}
                className="flex items-center gap-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <span>{t("addAdmin")}</span>
            </button>

            {formState.open && (
                <div className="overflow-y-auto fixed inset-0 z-50 flex justify-center items-center bg-black/50">
                    <div className="relative p-4 w-full max-w-md">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <AddAdminFormHeader setOpen={(open) => setModal(open)} />
                            <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                                <div className="grid gap-4 mb-4 grid-cols-2">
                                    {memoizedAdminInputs}
                                    {memoizedPhoneInput}
                                    {memoizedDateTimeInput}
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {loading ? t("adding") : t("addAdmin")}
                                </button>

                                {error && (
                                    <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                                        {error.message}
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
