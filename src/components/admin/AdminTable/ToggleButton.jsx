import { useState } from "react";
import { useTranslation } from "react-i18next";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { useDarkMode } from "../../../contexts/DarkModeContext";

const CHANGE_ADMIN_ACTIVE = gql`
  mutation ChangeAdminActive($id: ID!, $isActive: Boolean!) {
    changeAdminActive(adminId: $id, isActive: $isActive) {
      id
      isActive
    }
  }
`;

export default function ToggleButtonAdminsTable({ admin }) {
    const { t: translate } = useTranslation();
    const { isDarkMode } = useDarkMode();
    const [isActive, setIsActive] = useState(admin.isActive);
    const [changeAdminActive, { loading }] = useMutation(CHANGE_ADMIN_ACTIVE, {
        onError: () => alert(translate("errorOccured")),
        onCompleted: (data) => setIsActive(data.changeAdminActive.isActive),
    });

    const handleToggle = async () => {
        await changeAdminActive({
            variables: { id: admin.id, isActive: !isActive },
        });
    };

    return (
        <label className="inline-flex items-center cursor-pointer" title={isActive ? translate("deactivate") : translate("activate")}>
            <input
                type="checkbox"
                checked={isActive}
                disabled={loading}
                onChange={handleToggle}
                className="sr-only peer"
            />
            <div
                className={`
                    w-11 h-6
                    bg-gray-200
                    peer-focus:outline-none
                    peer-focus:ring-2 peer-focus:ring-blue-500
                    rounded-full
                    peer
                    dark:bg-gray-700
                    transition-colors
                    duration-300
                    relative
                    ${isActive ? "bg-green-400" : "bg-gray-200"}
                    ${loading ? "opacity-70 pointer-events-none" : ""}
                `}
                style={{
                    backgroundColor: isActive ? '#4ade80' : (isDarkMode ? '#374151' : '#e5e7eb')
                }}
            >
                <div
                    className={`
                        absolute left-1 top-1 bg-white border border-gray-300 h-4 w-4 rounded-full shadow
                        transition-all duration-300
                        ${isActive ? "translate-x-5" : ""}
                    `}
                    style={{
                        backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                        borderColor: isDarkMode ? '#4b5563' : '#d1d5db'
                    }}
                ></div>
            </div>
        </label>
    );
}
