import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_ADMINS, filterAdmins } from "./AdminsPageConstants.js";

export function useAdminsPage() {
	const [search, setSearch] = useState("");
	const { loading, error, data, refetch } = useQuery(GET_ADMINS);
	const [admins, setAdmins] = useState([]);

	// Filter admins based on search query
	useEffect(() => {
		if (!data?.getAdmins) return;

		const filtered = filterAdmins(data.getAdmins, search);
		setAdmins(filtered);
	}, [search, data]);

	// Initialize admins when data is loaded
	useEffect(() => {
		if (data?.getAdmins) {
			setAdmins(data.getAdmins);
		}
	}, [data]);

	return {
		search,
		setSearch,
		loading,
		error,
		data,
		admins,
		refetch,
	};
}
