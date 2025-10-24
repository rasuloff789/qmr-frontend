import { useAddAdminForm } from "./useAddAdminForm.js";
import AddAdminButton from "./AddAdminButton.jsx";
import AddAdminModal from "./AddAdminModal.jsx";

export default function AddAdmin({ onAdminAdded = null }) {
    const {
        formState,
        setField,
        setModal,
        handleSubmit,
        loading,
        error
    } = useAddAdminForm(onAdminAdded);

    return (
        <>
            <AddAdminButton onOpenModal={() => setModal(true)} />

            <AddAdminModal
                isOpen={formState.open}
                formState={formState}
                setField={setField}
                onSubmit={handleSubmit}
                loading={loading}
                error={error}
            />
        </>
    );
}
