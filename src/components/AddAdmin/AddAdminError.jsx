import { memo } from "react";

function AddAdminError({ error }) {
    if (!error) return null;

    return (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
            <div className="flex items-center">
                <svg className="w-4 h-4 text-red-500 mr-2 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-red-700">{error.message}</span>
            </div>
        </div>
    );
}

export default memo(AddAdminError);
