import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
	resources: {
		en: {
			translation: {
				welcome: "Welcome",
				login: "Login",
				username: "Username",
				inputUsername: "Enter username",
				password: "Password",
				inputPassword: "Input password",
				dashboard: "Dashboard",
				settings: "Settings",
				admins: "Admins",
				courses: "Courses",
				teachers: "Teachers",
				students: "Students",
				profile: "Profile",
				payments: "Payments",
				language: "English",
				loading: "Loading...",
				loginErr: "Username or password is not correct !",
			},
		},
		uz: {
			translation: {
				welcome: "Xush kelibsiz",
				login: "Kirish",
				username: "Foydalanuvchi nomi",
				inputUsername: "Foydalanuvchi nomini kiriting",
				password: "Parol",
				inputPassword: "Parolni kiriting",
				dashboard: "Boshqaruv paneli",
				settings: "Sozlamalar",
				admins: "Administratorlar",
				courses: "Kurslar",
				teachers: "O'qituvchilar",
				students: "Talabalar",
				profile: "Profil",
				payments: "To'lovlar",
				language: "O'zbekcha",
				loading: "Tekshirilmoqda...",
				loginErr: "Foydalanuvchi nomi yoki parol no'tog'ri !",
			},
		},
	},
	lng: "uz", // default language
	fallbackLng: "en", // agar tanlangan til yo'q bo'lsa
	interpolation: { escapeValue: false }, // React bilan moslash uchun
});

export default i18n;
