import AdminsPageLoading from "./AdminsPageLoading";
import AdminsPageError from "./AdminsPageError";
import AdminsPageNoAdmins from "./AdminsPageNoAdmins";
import AdminsPageNoResults from "./AdminsPageNoResults";
import AdminsPageContent from "./AdminsPageContent";
import { useAdminsPage } from "./useAdminsPage";

export default function AdminsPage() {
    const {
        search,
        setSearch,
        loading,
        error,
        data,
        admins,
        refetch
    } = useAdminsPage();

    // Show loading state
    if (loading) {
        return <AdminsPageLoading />;
    }

    // Show error state
    if (error) {
        return <AdminsPageError error={error} onRetry={refetch} />;
    }

    // Show no admins state (when no admins exist at all)
    if (!loading && data?.getAdmins?.length === 0) {
        return <AdminsPageNoAdmins onAddAdmin={refetch} />;
    }

    // Show filtered no results state (when search returns no results)
    if (!loading && data?.getAdmins?.length > 0 && admins.length === 0) {
        return (
            <AdminsPageNoResults
                search={search}
                onSearchChange={setSearch}
                onAddAdmin={refetch}
            />
        );
    }

    // Show admins table
    return (
        <AdminsPageContent
            search={search}
            onSearchChange={setSearch}
            onAddAdmin={refetch}
            loading={loading}
            admins={admins}
            onAdminDeleted={refetch}
        />
    );
}
