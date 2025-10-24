import { useTranslation } from "react-i18next";
import { memo } from "react";

function AddAdminButton({ onOpenModal }) {
    const { t: translate } = useTranslation();

    return (
        <button
            onClick={onOpenModal}
            className="flex items-center gap-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span>{translate("addAdmin")}</span>
        </button>
    );
}

export default memo(AddAdminButton);
