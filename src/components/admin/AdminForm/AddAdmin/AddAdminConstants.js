import { gql } from "@apollo/client";

// GraphQL mutation
export const ADD_ADMIN = gql`
	mutation AddAdmin(
		$username: String!
		$password: String!
		$fullname: String!
		$tgUsername: String!
		$birthDate: Date!
		$phone: Phone!
	) {
		addAdmin(
			username: $username
			password: $password
			fullname: $fullname
			tgUsername: $tgUsername
			birthDate: $birthDate
			phone: $phone
		) {
			id
			username
			fullname
		}
	}
`;

// Form state reducer for better state management
export const formReducer = (state, action) => {
	switch (action.type) {
		case "SET_FIELD":
			return { ...state, [action.field]: action.value };
		case "SET_ERRORS":
			return { ...state, errors: action.errors };
		case "CLEAR_FORM":
			return {
				username: "",
				fullname: "",
				password: "",
				tgUsername: "",
				countryCode: "90",
				phoneNumber: "",
				birthDate: null,
				errors: {},
			};
		case "SET_MODAL":
			return { ...state, open: action.open };
		default:
			return state;
	}
};

// Initial form state
export const initialFormState = {
	open: false,
	username: "",
	fullname: "",
	password: "",
	tgUsername: "",
	countryCode: "90",
	phoneNumber: "",
	birthDate: null,
	errors: {},
};
