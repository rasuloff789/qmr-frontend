import { t } from "i18next";
import { useState } from "react";
import PhoneNumberInput from "./PhoneNumberInput.jsx";
import AdminInputs from "./AdminInputs.AddAdminModal.jsx";
import AddAdminFormHeader from "./FormHeader.AddAdminModal.jsx";
import DateTimeInput from "./DateTimeInput.AddAdminModal.jsx";
import { validateAdminInputs } from "../utils/validators.js"; // ✅ validator import
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

// GraphQL mutation
const ADD_ADMIN = gql`
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

export default function AddAdmin() {
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [fullname, setFullname] = useState("");
    const [password, setPassword] = useState("");
    const [tgUsername, setTgUsername] = useState("");
    const [countryCode, setCountryCode] = useState("90");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [birthDate, setBirthDate] = useState(null);
    const [errors, setErrors] = useState({});

    // Mutation
    const [addAdminMutation, { loading, error }] = useMutation(ADD_ADMIN);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // ✅ tashqi validatorni chaqiramiz
        const newErrors = validateAdminInputs({
            fullname,
            username,
            password,
            tgUsername,
            phoneNumber,
        });

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        if (Object.keys(errors).length === 0) {
            try {
                const { data, error } = await addAdminMutation({
                    variables: {
                        username,
                        password,
                        fullname,
                        tgUsername,
                        birthDate: birthDate.toISOString().split("T")[0], // YYYY-MM-DD format
                        phone: `${countryCode}${phoneNumber}`, // Phone type Phone! bo'lishi kerak
                    },
                });

                setOpen(false); // modalni yopish
            } catch (err) {
                console.log("Admin added:", err);
                console.error("Add admin error:", err.message);
            }
        }


    };

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="flex items-center gap-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <span>{t("addAdmin")}</span>
            </button>

            {open && (
                <div className="overflow-y-auto fixed inset-0 z-50 flex justify-center items-center bg-black/50">
                    <div className="relative p-4 w-full max-w-md">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <AddAdminFormHeader setOpen={setOpen} />
                            <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                                <div className="grid gap-4 mb-4 grid-cols-2">
                                    <AdminInputs
                                        username={username}
                                        password={password}
                                        fullname={fullname}
                                        tgUsername={tgUsername}
                                        setFullname={setFullname}
                                        setPassword={setPassword}
                                        setTgUsername={setTgUsername}
                                        setUsername={setUsername}
                                        errors={errors}
                                    />
                                    <PhoneNumberInput
                                        countryCode={countryCode}
                                        setCountryCode={setCountryCode}
                                        phoneNumber={phoneNumber}
                                        setPhoneNumber={setPhoneNumber}
                                        errors={errors}
                                    />
                                    <DateTimeInput birthDate={birthDate} setBirthDate={setBirthDate} />
                                </div>

                                <button
                                    type="submit"
                                    className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5"
                                >
                                    <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {t("addAdmin")}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
