// src/utils/validators.js

export function validateAdminInputs({
	fullname,
	username,
	password,
	tgUsername,
	phoneNumber,
}) {
	const errors = {};

	if (!/^[a-zA-ZğüşöçıİĞÜŞÖÇ\s]{3,50}$/.test(fullname))
		errors.fullname = "Ism 3–50 ta harfdan iborat bo‘lishi kerak.";

	if (!/^[a-zA-Z0-9_]{3,20}$/.test(username))
		errors.username =
			"Username 3–20 ta belgi, faqat harf, raqam yoki pastki chiziq.";

	if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/.test(password))
		errors.password =
			"Parolda kamida 1 ta katta harf, kichik harf va raqam bo‘lishi kerak.";

	if (!/^@[a-zA-Z0-9_]{5,32}$/.test(tgUsername))
		errors.tgUsername =
			"Telegram username @ bilan boshlanib 5–32 belgidan iborat bo‘lishi kerak.";

	if (!/^\d{9,10}$/.test(phoneNumber))
		errors.phoneNumber = "Telefon raqam 9–10 raqamdan iborat bo‘lishi kerak.";

	return errors;
}
