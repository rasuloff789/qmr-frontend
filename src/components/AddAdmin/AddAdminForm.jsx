import { useCallback, useMemo } from "react";
import PhoneNumberInput from "../PhoneNumberInput.jsx";
import AdminInputs from "../AdminInputs.AddAdminModal.jsx";
import DateTimeInput from "../DateTimeInput.AddAdminModal.jsx";
import AddAdminActions from "./AddAdminActions.jsx";
import AddAdminError from "./AddAdminError.jsx";
import { validateAdminInputs } from "../../utils/validators.js";

function AddAdminForm({
    formState,
    setField,
    onSubmit,
    loading,
    error
}) {
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
            error={formState.errors.birthDate}
        />
    ), [formState.birthDate, formState.errors.birthDate, setField]);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        console.log("🚀 Form submitted with data:", formState);

        // Validate form inputs
        const newErrors = validateAdminInputs({
            fullname: formState.fullname,
            username: formState.username,
            password: formState.password,
            tgUsername: formState.tgUsername,
            phoneNumber: formState.phoneNumber,
            birthDate: formState.birthDate?.toISOString().split("T")[0], // Convert Date to YYYY-MM-DD string
        });

        console.log("🔍 Validation errors:", newErrors);

        // Return early if validation fails
        if (Object.keys(newErrors).length > 0) {
            console.log("❌ Validation failed, not submitting");
            return;
        }

        // Call the parent onSubmit handler
        await onSubmit();
    }, [formState, onSubmit]);

    return (
        <form className="p-6 animate-in fade-in-0 slide-in-from-bottom-2 duration-300" onSubmit={handleSubmit}>
            {/* Form Grid */}
            <div className="grid gap-4 mb-6 grid-cols-1">
                <div className="animate-in fade-in-0 slide-in-from-left-2 duration-300 delay-100">
                    {memoizedAdminInputs}
                </div>
                <div className="animate-in fade-in-0 slide-in-from-left-2 duration-300 delay-200">
                    {memoizedPhoneInput}
                </div>
                <div className="animate-in fade-in-0 slide-in-from-left-2 duration-300 delay-300">
                    {memoizedDateTimeInput}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="animate-in fade-in-0 slide-in-from-bottom-2 duration-300 delay-400">
                <AddAdminActions loading={loading} onSubmit={handleSubmit} />
            </div>

            {/* Error Display */}
            <div className="animate-in fade-in-0 slide-in-from-bottom-2 duration-300 delay-500">
                <AddAdminError error={error} />
            </div>
        </form>
    );
}

export default AddAdminForm;
