// src/utils/validators.js

// Individual validation functions
export function validateFullname(fullname) {
	if (!fullname) return null;
	if (fullname.trim().length < 2) {
		return "fullnameError";
	}
	return null;
}

export function validatePassword(password) {
	if (!password) return null;
	const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
	if (!passwordRegex.test(password)) {
		return "passwordError";
	}
	return null;
}

// Backend-matching validation functions
export function validatePhoneNumber(phone) {
	if (!phone) return null;

	const phoneDigits = phone.replace(/\D/g, "");

	// Check Uzbekistan format (998 + 9 digits = 12 total)
	if (phoneDigits.startsWith("998")) {
		if (phoneDigits.length !== 12) {
			return "phoneNumberError";
		}
		return null;
	}

	// Check Turkey format (90 + 10 digits = 12 total)
	if (phoneDigits.startsWith("90")) {
		if (phoneDigits.length !== 12) {
			return "phoneNumberError";
		}
		return null;
	}

	// Check local formats
	// Uzbekistan local: 9 digits
	if (phoneDigits.length === 9) {
		return null;
	}

	// Turkey local: 10 digits starting with 5
	if (phoneDigits.length === 10 && phoneDigits.startsWith("5")) {
		return null;
	}

	return "phoneNumberError";
}

export function validateUsername(username) {
	if (!username) return null;

	// Backend rule: lowercase letters and numbers, 4-10 characters
	const usernameRegex = /^(?!.*\s)[a-z0-9]{4,10}$/;
	if (!usernameRegex.test(username)) {
		return "usernameError";
	}

	return null;
}

export function validateTelegramUsername(tgUsername) {
	if (!tgUsername) return null;

	// Backend rule: 5-32 characters, letters/numbers/_ only
	const tgUsernameRegex = /^(?!.*\s)[a-zA-Z0-9_]{5,32}$/;
	if (!tgUsernameRegex.test(tgUsername)) {
		return "tgUsernameError";
	}

	return null;
}

export function validateBirthDate(dateString) {
	if (!dateString) return null; // Date is optional

	// Check YYYY-MM-DD format
	const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
	if (!dateRegex.test(dateString)) {
		return "Invalid date format. Use YYYY-MM-DD";
	}

	const date = new Date(dateString);
	const now = new Date();

	// Check if date is valid and not in the future
	if (isNaN(date.getTime()) || date > now) {
		return "Invalid date or date is in the future";
	}

	return null;
}

// Unified validation function for admin forms
export function validateAdminForm({
	fullname,
	username,
	password,
	tgUsername,
	phone,
	phoneNumber, // For backward compatibility
	birthDate,
	includePassword = false, // Whether to validate password
}) {
	const errors = {};

	// Fullname validation
	const fullnameError = validateFullname(fullname);
	if (fullnameError) {
		errors.fullname = fullnameError;
	}

	// Username validation
	const usernameError = validateUsername(username);
	if (usernameError) {
		errors.username = usernameError;
	}

	// Password validation (only if includePassword is true)
	if (includePassword) {
		const passwordError = validatePassword(password);
		if (passwordError) {
			errors.password = passwordError;
		}
	}

	// Telegram username validation
	const tgUsernameError = validateTelegramUsername(tgUsername);
	if (tgUsernameError) {
		errors.tgUsername = tgUsernameError;
	}

	// Phone validation (use phone or phoneNumber)
	const phoneToValidate = phone || phoneNumber;
	const phoneError = validatePhoneNumber(phoneToValidate);
	if (phoneError) {
		errors.phoneNumber = phoneError;
	}

	// Birth date validation
	const birthDateError = validateBirthDate(birthDate);
	if (birthDateError) {
		errors.birthDate = birthDateError;
	}

	return errors;
}

// Convenience functions for backward compatibility
export function validateAdminInputs(fields) {
	return validateAdminForm({ ...fields, includePassword: true });
}

export function validateAdminEditForm(fields) {
	return validateAdminForm({ ...fields, includePassword: false });
}
