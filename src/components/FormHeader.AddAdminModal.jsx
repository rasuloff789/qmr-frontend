import { t } from "i18next"
import { memo } from "react";

function AddAdminFormHeader({ setOpen, setField }) {
    return (
        <>
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 border-b dark:border-gray-600 border-gray-200">
                <h3 className="text-base font-medium text-gray-900 dark:text-white">
                    {t("menuAddAdmin")}
                </h3>
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
                    className="text-gray-400 bg-transparent rounded w-6 h-6 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white focus:outline-none"
                >
                    <span aria-hidden="true" className="text-lg">&times;</span>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
        </>
    );
}

export default memo(AddAdminFormHeader);