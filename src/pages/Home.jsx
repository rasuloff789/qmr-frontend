import { useState } from "react";
import { Sidebar } from "../components/Sidebar.jsx";
import { useTranslation } from "react-i18next";
import AdminsPage from "./AdminsPage.jsx"



export default function Home() {
    const [activePage, setActivePage] = useState("dashboard");
    const { t, i18n } = useTranslation();

    const renderPage = () => {
        switch (activePage) {
            case "dashboard":
                return <h1>Dashboard</h1>;
            case "admins":
                return <AdminsPage />;
            default:
                return <h1>Page Not Found</h1>;
        }
    };

    return (
        <div className="flex w-screen h-screen bg-gray-50">
            <Sidebar activePage={activePage} onNavigate={setActivePage} />
            <div className="flex-1 overflow-y-auto overflow-x-auto">
                <div className="p-5 border-b border-gray-200 items-end flex flex-col">
                    <select
                        value={i18n.language}
                        onChange={(e) => i18n.changeLanguage(e.target.value)}
                        className="h-6 rounded px-2">
                        <option value="uz">🇺🇿 O'zbekcha</option>
                        <option value="en">🇬🇧 English</option>
                    </select>
                </div>
                <main className="flex-1 overflow-y-auto mx-5">
                    {renderPage()}
                </main>
            </div>
        </div>
    );
}
