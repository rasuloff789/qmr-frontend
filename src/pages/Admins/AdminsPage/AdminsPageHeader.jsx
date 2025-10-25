import { memo } from "react";
import SearchAdminInput from "../../../../components/admin/SearchAdmin";
import AddAdmin from "../../../../components/admin/AdminForm/AddAdmin";

function AdminsPageHeader({ search, onSearchChange, onAddAdmin }) {
    return (
        <div className="flex justify-between items-center">
            <SearchAdminInput search={search} AdminSearch={onSearchChange} />
            <AddAdmin onAdminAdded={onAddAdmin} />
        </div>
    );
}

export default memo(AdminsPageHeader);
