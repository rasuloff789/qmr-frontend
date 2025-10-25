import { memo, useEffect, useState } from "react";
import AddAdminFormHeader from "../FormHeader.jsx";
import AddAdminForm from "./AddAdminForm.jsx";
import { useDarkMode } from "../../../../../../contexts/DarkModeContext";

function AddAdminModal({
    isOpen,
    formState,
    setField,
    onSubmit,
    loading,
    error
}) {
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const { isDarkMode } = useDarkMode();

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            // Small delay to ensure DOM is ready
            setTimeout(() => setIsAnimating(true), 10);
        } else {
            setIsAnimating(false);
            // Wait for animation to complete before hiding
            setTimeout(() => setIsVisible(false), 300);
        }
    }, [isOpen]);

    if (!isVisible) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            setField('open', false);
        }
    };

    return (
        <div
            className={`overflow-y-auto fixed inset-0 z-50 flex justify-center items-center bg-black/50 backdrop-blur-sm transition-all duration-300 ease-out ${isAnimating ? 'opacity-100' : 'opacity-0'
                }`}
            onClick={handleBackdropClick}
        >
            <div className="relative p-4 w-full max-w-lg">
                <div
                    className={`relative bg-white rounded-xl shadow-xl dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all duration-300 ease-out transform ${isAnimating
                        ? 'opacity-100 scale-100 translate-y-0'
                        : 'opacity-0 scale-95 translate-y-4'
                        }`}
                    style={{
                        backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                        borderColor: isDarkMode ? '#374151' : '#e5e7eb'
                    }}
                >
                    {/* Header with light blue colors */}
                    <div className="bg-gradient-to-r from-blue-400 to-blue-500 rounded-t-xl p-4">
                        <AddAdminFormHeader setOpen={(open) => setField('open', open)} setField={setField} />
                    </div>

                    <AddAdminForm
                        formState={formState}
                        setField={setField}
                        onSubmit={onSubmit}
                        loading={loading}
                        error={error}
                    />
                </div>
            </div>
        </div>
    );
}

export default memo(AddAdminModal);
