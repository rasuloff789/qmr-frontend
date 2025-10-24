import React from "react";
import { useTranslation } from "react-i18next";

export default function Home() {
    const { t: translate } = useTranslation();

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">{translate("dashboard")}</h1>
            <p className="text-gray-600">{translate("welcomeToDashboard")}</p>
        </div>
    );
}