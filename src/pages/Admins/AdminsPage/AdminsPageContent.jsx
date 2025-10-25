import { memo } from "react";
import AdminsTable from "../../../../components/admin/AdminTable/index.jsx";
import AdminsPageHeader from "./AdminsPageHeader";

function AdminsPageContent({ search, onSearchChange, onAddAdmin, loading, admins, onAdminDeleted }) {
    return (
        <div className="space-y-6">
            {/* Header with search and add button */}
            <AdminsPageHeader
                search={search}
                onSearchChange={onSearchChange}
                onAddAdmin={onAddAdmin}
            />

            {/* Admins Table */}
            <AdminsTable
                loading={loading}
                admins={admins}
                onAdminDeleted={onAdminDeleted}
            />
        </div>
    );
}

export default memo(AdminsPageContent);
