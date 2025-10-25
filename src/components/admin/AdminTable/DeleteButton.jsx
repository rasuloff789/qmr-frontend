import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useDarkMode } from "../../../contexts/DarkModeContext";

const DELETE_ADMIN_MUTATION = gql`
  mutation DeleteAdmin($id: ID!) {
    deleteAdmin(adminId: $id) {
      success
      message
      admin {
        id
      }
      errors
      timestamp
    }
  }
`;

export default function DeleteAdminButton({ adminId, onDeleted }) {
    const { t: translate } = useTranslation();
    const { isDarkMode } = useDarkMode();
    const [loading, setLoading] = useState(false);
    const [deleteAdmin] = useMutation(DELETE_ADMIN_MUTATION, {
        onCompleted: (data) => {
            setLoading(false);
            if (data?.deleteAdmin?.success) {
                if (onDeleted) onDeleted();
            } else {
                const errors = data?.deleteAdmin?.errors || [];
                const message = data?.deleteAdmin?.message || translate("errorOccured");
                alert(`${message}. ${errors.join(', ')}`);
            }
        },
        onError: (error) => {
            console.error("❌ Delete admin error:", error);
            setLoading(false);
            alert(error.message || translate("errorOccured"));
        },
    });

    const handleDelete = () => {
        if (window.confirm(translate("deleteAdminConfirmation"))) {
            console.log("Deleting admin with ID:", adminId);
            setLoading(true);
            deleteAdmin({ variables: { id: adminId } });
        }
    };

    return (
        <button
            onClick={handleDelete}
            className="p-1 rounded hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors disabled:opacity-50"
            style={{
                backgroundColor: isDarkMode ? 'transparent' : 'transparent'
            }}
            disabled={loading}
            title={translate("delete")}
        >
            {/* Use a more neutral "remove" or cross icon instead of a trash can */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{
                    color: isDarkMode ? '#60a5fa' : '#3b82f6'
                }}
            >
                <rect x="6" y="8" width="12" height="10" rx="2" stroke="currentColor" strokeWidth={2} fill="none" />
                <path d="M9 8V6a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth={2} fill="none" />
                <line x1="10" y1="12" x2="10" y2="17" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
                <line x1="14" y1="12" x2="14" y2="17" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
            </svg>
        </button>
    );
}
