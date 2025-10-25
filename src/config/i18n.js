import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Get saved language from localStorage or default to 'uz'
const savedLanguage = localStorage.getItem("app-language") || "uz";

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
				logout: "Logout",
				loginErr: "Username or password is not correct !",
				noAdmins: "There aren't any Admins...",
				fullname: "Fullname",
				phoneNumber: "Phone",
				birthDate: "Birthdate",
				active: "Active",
				search: "Search",
				searchPlaceholder: "Name, username, phone...",
				tgUsername: "Telegram username",
				typeFullname: "Enter fullname... e.g. John Smit",
				typeUsername: "Enter username... e.g. adminbeki",
				typeTgUsername: "Write possible telegram username e.g. rosulismoiliy",
				phoneNumber: "Phone number",
				birthDate: "Birthdate",
				chooseBDate: "Choose birthdate",
				menuAddAdmin: "Adding admin menu",
				addAdmin: "Add admin",
				errorOccured: "Error occurred",
				deactivate: "Deactivate",
				activate: "Activate",
				active: "Active",
				inactive: "Inactive",
				deleteAdminConfirmation: "Are you sure you want to delete this admin?",
				delete: "Delete",
				fullnameError: "Fullname must be 3–50 characters long",
				usernameError:
					"Username must be 4–10 characters long, only letters, numbers or underscore",
				passwordError:
					"Password must be 8–20 characters long, at least 1 uppercase letter, lowercase letter and number",
				tgUsernameError: "Telegram username must be 5–32 characters long",
				phoneNumberError: "Phone number must be 9–10 digits long",
				birthDateError: "Birthdate is required",
				chooseBDateError: "Choose birthdate",
				menuAddAdminError: "Adding admin menu",
				addAdminError: "Add admin",
				errorOccuredError: "Error occurred",
				deactivateError: "Deactivate",
				activateError: "Activate",
				activeError: "Active",
				inactiveError: "Inactive",
				deleteAdminConfirmationError:
					"Are you sure you want to delete this admin?",
				deleteError: "Delete",
				phoneNumberError: "Phone number must be 9–10 digits long",
				// Coming Soon Page
				comingSoon: "Coming Soon!",
				workingOnIt: "We're working hard to bring you this feature!",
				page: "Page",
				// Layout
				"Back to Admins": "Back to Admins",
				"Admin Details": "Admin Details",
				"Qomar Qur'on Markazi": "Qomar Qur'on Markazi",
				// Add Admin
				adding: "Adding...",
				// Language options
				"🇺🇿 O'zbekcha": "🇺🇿 O'zbekcha",
				"🇬🇧 English": "🇬🇧 English",
				// Home page
				welcomeToDashboard: "Welcome to the Qomar Qur'on Markazi dashboard.",
				// Admin page
				adminDetails: "Admin Details",
				id: "ID",
				status: "Status",
				editAdmin: "Edit Admin",
				backToAdmins: "Back to Admins",
				adminNotFound: "Admin not found",
				error: "Error",
				// Admins Table
				telegram: "Telegram",
				actions: "Actions",
				addAdmin: "Add Admin",
				// Edit Admin
				cancel: "Cancel",
				saveChanges: "Save Changes",
				saving: "Saving...",
				// Validation Errors
				fullnameError:
					"Full name must be 3-50 characters and contain only letters",
				usernameError:
					"Username must be 4-10 characters, lowercase letters and numbers only",
				passwordError:
					"Password must be at least 8 characters with uppercase, lowercase, and number",
				tgUsernameError:
					"Telegram username must be 5-32 characters, letters, numbers and underscores only",
				phoneNumberError: "Phone number must be 9-10 digits",
				status: "Status",
				active: "Active",
				inactive: "Inactive",
				addNewAdminDescription: "Add a new administrator to the system",
				closeModal: "Close modal",
				selectedDate: "Selected date",
				noAdminsFound: "No administrators found",
				noAdminsDescription:
					"Get started by adding your first administrator to the system",
				noResultsFound: "No results found",
				noResultsDescription:
					"Try adjusting your search terms or clear the search to see all administrators",
				clearSearch: "Clear search",
				loading: "Loading...",
				tryAgain: "Try again",
				// Password Change
				changePassword: "Change Password",
				oldPassword: "Old Password",
				newPassword: "New Password",
				confirmPassword: "Confirm Password",
				enterOldPassword: "Enter old password",
				enterNewPassword: "Enter new password",
				confirmNewPassword: "Confirm new password",
				passwordsDoNotMatch: "Passwords do not match",
				oldPasswordRequired: "Old password is required",
				passwordChangedSuccess: "Password changed successfully!",
				userNotFound: "User not found",
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
				logout: "Chiqish",
				loginErr: "Foydalanuvchi nomi yoki parol no'tog'ri !",
				noAdmins: "Administratorlar mavjud emas...",
				fullname: "F.I.SH",
				phoneNumber: "Tel/raqami",
				birthDate: "Tug'ilgan sana",
				active: "Faollik",
				search: "Qidirish",
				searchPlaceholder: "Ism, foydalanuvchi nomi, tel/raqam...",
				tgUsername: "Telegram foydalanuvchi nomi",
				typeFullname: "Ism Sharifni kiriting e.g. Azimjonov Akobir",
				typeUsername: "Foydalanuvchi nomini kiriting e.g. adminbek",
				typePassword: "Parolni kiriting e.g. parol123",
				typeTgUsername: "Mavjud Telegram username kirgizing e.g. rosulismoiliy",
				phoneNumber: "Telefon raqami",
				birthDate: "Tug'ilgan sana",
				chooseBDate: "Tug'ilgan sanani tanlang",
				menuAddAdmin: "Adminstrator qo'shish menyusi",
				addAdmin: "Admin qo'shish",
				errorOccured: "Xatolik yuz berdi",
				deactivate: "Faol emas",
				activate: "Faol",
				active: "Faol",
				inactive: "Faol emas",
				deleteAdminConfirmation: "Adminni o'chirishni xohlaysizmi?",
				delete: "O'chirish",
				fullnameError: "Ism 3–50 ta harfdan iborat bo‘lishi kerak.",
				usernameError:
					"Foydalanuvchi nomi 4–10 ta belgi, faqat harf, raqam yoki pastki chiziq bo‘lishi kerak.",
				passwordError:
					"Parol 8–20 ta belgidan iborat bo‘lishi kerak, kamida 1 ta katta harf, kichik harf va raqam bo‘lishi kerak.",
				tgUsernameError:
					"Telegram foydalanuvchi nomi 5–32 belgidan iborat bo‘lishi kerak.",
				phoneNumberError: "Telefon raqam 9–10 raqamdan iborat bo‘lishi kerak.",
				birthDateError: "Tug'ilgan sana talab etiladi",
				chooseBDateError: "Tug'ilgan sanani tanlang",
				menuAddAdminError: "Adminstrator qo'shish menyusi",
				addAdminError: "Admin qo'shish",
				// Coming Soon Page
				comingSoon: "Tez orada!",
				workingOnIt:
					"Bu funksiyani sizga taqdim etish uchun qattiq ishlayapmiz!",
				page: "Sahifa",
				// Layout
				"Back to Admins": "Adminstratorlarga qaytish",
				"Admin Details": "Adminstrator tafsilotlari",
				"Qomar Qur'on Markazi": "Qomar Qur'on Markazi",
				// Add Admin
				adding: "Qo'shilmoqda...",
				// Language options
				"🇺🇿 O'zbekcha": "🇺🇿 O'zbekcha",
				"🇬🇧 English": "🇬🇧 English",
				// Home page
				welcomeToDashboard:
					"Qomar Qur'on Markazi boshqaruv paneliga xush kelibsiz.",
				// Admin page
				adminDetails: "Adminstrator tafsilotlari",
				id: "ID",
				status: "Holat",
				editAdmin: "Adminstratorni tahrirlash",
				backToAdmins: "Adminstratorlarga qaytish",
				adminNotFound: "Adminstrator topilmadi",
				error: "Xatolik",
				// Admins Table
				telegram: "Telegram",
				actions: "Amallar",
				addAdmin: "Admin qo'shish",
				// Edit Admin
				cancel: "Bekor qilish",
				saveChanges: "O'zgarishlarni saqlash",
				saving: "Saqlanmoqda...",
				// Validation Errors
				fullnameError:
					"To'liq ism 3-50 belgi bo'lishi va faqat harflardan iborat bo'lishi kerak",
				usernameError:
					"Foydalanuvchi nomi 4-10 belgi bo'lishi va faqat kichik harflar va raqamlardan iborat bo'lishi kerak",
				passwordError:
					"Parol kamida 8 belgi bo'lishi va katta harf, kichik harf va raqam bo'lishi kerak",
				tgUsernameError:
					"Telegram foydalanuvchi nomi 5-32 belgi bo'lishi va harflar, raqamlar va pastki chiziqlardan iborat bo'lishi kerak",
				phoneNumberError: "Telefon raqami 9-10 raqamdan iborat bo'lishi kerak",
				status: "Holat",
				active: "Faol",
				inactive: "Faol emas",
				addNewAdminDescription: "Tizimga yangi administrator qo'shish",
				closeModal: "Modalni yopish",
				selectedDate: "Tanlangan sana",
				noAdminsFound: "Administratorlar topilmadi",
				noAdminsDescription:
					"Tizimga birinchi administratoringizni qo'shish orqali boshlang",
				noResultsFound: "Natijalar topilmadi",
				noResultsDescription:
					"Qidiruv so'zlarini o'zgartiring yoki barcha administratorlarni ko'rish uchun qidiruvni tozalang",
				clearSearch: "Qidiruvni tozalash",
				loading: "Yuklanmoqda...",
				tryAgain: "Qayta urinish",
				// Password Change
				changePassword: "Parolni o'zgartirish",
				oldPassword: "Eski parol",
				newPassword: "Yangi parol",
				confirmPassword: "Parolni tasdiqlash",
				enterOldPassword: "Eski parolni kiriting",
				enterNewPassword: "Yangi parolni kiriting",
				confirmNewPassword: "Yangi parolni tasdiqlang",
				passwordsDoNotMatch: "Parollar mos kelmaydi",
				oldPasswordRequired: "Eski parol talab etiladi",
				passwordChangedSuccess: "Parol muvaffaqiyatli o'zgartirildi!",
				userNotFound: "Foydalanuvchi topilmadi",
			},
		},
	},
	lng: savedLanguage, // use saved language
	fallbackLng: "en", // agar tanlangan til yo'q bo'lsa
	interpolation: { escapeValue: false }, // React bilan moslash uchun
});

// Listen for language changes and save to localStorage
i18n.on("languageChanged", (lng) => {
	localStorage.setItem("app-language", lng);
});

export default i18n;
