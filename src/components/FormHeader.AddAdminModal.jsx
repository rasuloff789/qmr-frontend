import { useTranslation } from "react-i18next";
import { memo } from "react";

function AddAdminFormHeader({ setOpen, setField }) {
    const { t: translate } = useTranslation();

    return (
        <div className="flex items-center justify-between">
            <div>
                <h3 className="text-lg font-semibold text-white">
                    {translate("menuAddAdmin")}
                </h3>
            </div>
            <button
                onClick={() => {
                    setOpen(false);
                    setField("fullname", "");
                    setField("username", "");
                    setField("password", "");
                    setField("tgUsername", "");
                    setField("phoneNumber", "");
                    setField("birthDate", null);
                    setField("errors", {});
                    setField("countryCode", "998");
                }}
                type="button"
                className="text-white/80 hover:text-white hover:bg-white/20 rounded-lg p-1.5 transition-all duration-200 focus:outline-none hover:scale-110 active:scale-95"
            >
                <svg className="w-5 h-5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="sr-only">{translate("closeModal")}</span>
            </button>
        </div>
    );
}

export default memo(AddAdminFormHeader);