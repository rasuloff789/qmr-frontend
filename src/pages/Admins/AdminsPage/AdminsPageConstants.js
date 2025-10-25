import { gql } from "@apollo/client";

// GraphQL query for getting admins
export const GET_ADMINS = gql`
	query GetAdmins {
		getAdmins {
			id
			fullname
			username
			phone
			tgUsername
			birthDate
			isActive
		}
	}
`;

// Search filter function
export const filterAdmins = (admins, searchQuery) => {
	if (!searchQuery.trim()) return admins;

	const query = searchQuery.toLowerCase().trim();
	return admins.filter((admin) => {
		return (
			admin.id.toString() === query || // id bo'yicha
			admin.fullname.toLowerCase().includes(query) || // ism bo'yicha
			admin.username.toLowerCase().includes(query) || // username bo'yicha
			admin.phone.includes(query) || // telefon raqam bo'yicha
			admin.birthDate.includes(query) // telefon raqam bo'yicha
		);
	});
};
