import { useState } from "react";
import { Sidebar } from "../components/Sidebar.jsx";
import { useTranslation } from "react-i18next";
import Login from "./Login.jsx";



export default function Home() {
    const [activePage, setActivePage] = useState("dashboard");
    const { t, i18n } = useTranslation();

    const renderPage = () => {
        switch (activePage) {
            case "dashboard":
                return <h1>Dashboard</h1>;
            default:
                return <h1>Page Not Found</h1>;
        }
    };

    return (
        <div className="flex w-screen h-screen bg-gray-50">
            <Sidebar activePage={activePage} onNavigate={setActivePage} />
            <div className="flex-1 overflow-y-auto">
                <div className="p-6 place-items-end overflow-y-auto border-b border-gray-200 flex gap-4 justify-end">
                    <div className="">
                        <select
                            value={i18n.language}
                            onChange={(e) => i18n.changeLanguage(e.target.value)}
                            class="px-3">
                            <option value="uz">🇺🇿 O'zbekcha</option>
                            <option value="en">🇬🇧 English</option>
                        </select>

                    </div>
                </div>
                <main className="flex-1 overflow-y-auto">
                    {renderPage()}
                </main>
            </div>
        </div>
    );
}
