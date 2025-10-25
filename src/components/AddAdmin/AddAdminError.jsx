import { memo } from "react";
import { useDarkMode } from "../../contexts/DarkModeContext";

function AddAdminError({ error }) {
    const { isDarkMode } = useDarkMode();
    
    if (!error) return null;

    // Extract error message from different error types
    let errorMessage = "";
    if (typeof error === 'string') {
        errorMessage = error;
    } else if (error.message) {
        errorMessage = error.message;
    } else if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        errorMessage = error.graphQLErrors[0].message;
    } else if (error.networkError) {
        errorMessage = "Network error: " + error.networkError.message;
    } else {
        errorMessage = "An error occurred";
    }

    return (
        <div 
            className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg animate-in fade-in-0 slide-in-from-bottom-2 duration-300"
            style={{
                backgroundColor: isDarkMode ? 'rgba(127, 29, 29, 0.2)' : '#fef2f2',
                borderColor: isDarkMode ? '#991b1b' : '#fecaca'
            }}
        >
            <div className="flex items-center">
                <svg 
                    className="w-4 h-4 text-red-500 dark:text-red-400 mr-2 animate-pulse" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                    style={{
                        color: isDarkMode ? '#fca5a5' : '#ef4444'
                    }}
                >
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span 
                    className="text-sm text-red-700 dark:text-red-300"
                    style={{
                        color: isDarkMode ? '#fca5a5' : '#b91c1c'
                    }}
                >
                    {errorMessage}
                </span>
            </div>
        </div>
    );
}

export default memo(AddAdminError);
