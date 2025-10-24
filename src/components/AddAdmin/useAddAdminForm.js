import { useReducer, useCallback } from "react";
import { useMutation } from "@apollo/client/react";
import {
	ADD_ADMIN,
	formReducer,
	initialFormState,
} from "./AddAdminConstants.js";

export function useAddAdminForm(onAdminAdded = null) {
	const [formState, dispatch] = useReducer(formReducer, initialFormState);

	// Mutation
	const [addAdminMutation, { loading, error }] = useMutation(ADD_ADMIN, {
		onCompleted: (data) => {
			console.log("✅ Admin added successfully:", data);
			// Clear form and close modal on success
			dispatch({ type: "CLEAR_FORM" });
			dispatch({ type: "SET_MODAL", open: false });
			// Call the callback to refresh the admin list
			if (onAdminAdded) {
				onAdminAdded();
			}
		},
		onError: (error) => {
			console.error("❌ Add admin error:", error);
		},
	});

	// Memoized field setters for performance
	const setField = useCallback((field, value) => {
		dispatch({ type: "SET_FIELD", field, value });
	}, []);

	const setModal = useCallback((open) => {
		dispatch({ type: "SET_MODAL", open });
	}, []);

	// Form submission handler
	const handleSubmit = useCallback(async () => {
		try {
			console.log("📤 Sending mutation with variables:", {
				username: formState.username,
				password: formState.password,
				fullname: formState.fullname,
				tgUsername: formState.tgUsername,
				birthDate: formState.birthDate?.toISOString().split("T")[0],
				phone: `${formState.countryCode}${formState.phoneNumber}`,
			});

			await addAdminMutation({
				variables: {
					username: formState.username,
					password: formState.password,
					fullname: formState.fullname,
					tgUsername: formState.tgUsername,
					birthDate: formState.birthDate?.toISOString().split("T")[0], // YYYY-MM-DD format
					phone: `${formState.countryCode}${formState.phoneNumber}`,
				},
			});
		} catch (err) {
			console.error("❌ Add admin error:", err.message);
			// Handle error state if needed
		}
	}, [formState, addAdminMutation]);

	return {
		formState,
		setField,
		setModal,
		handleSubmit,
		loading,
		error,
	};
}
