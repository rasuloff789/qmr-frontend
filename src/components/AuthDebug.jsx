import React from "react";

export default function AuthDebug() {
    const checkAuth = () => {
        const token = localStorage.getItem("authentification");
        console.log("🔍 Manual Auth Check:");
        console.log("Token:", token);
        console.log("Token type:", typeof token);
        console.log("Starts with Bearer:", token?.startsWith("Bearer "));
        console.log("All localStorage:", localStorage);

        // Test the ME query manually
        fetch("http://localhost:4000/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token || "",
            },
            body: JSON.stringify({
                query: "query Me { me { id username fullname } }",
                variables: {},
                operationName: "Me"
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log("🚀 Manual ME Query Result:", data);
            })
            .catch(err => {
                console.error("❌ Manual ME Query Error:", err);
            });
    };

    const clearAuth = () => {
        localStorage.removeItem("authentification");
        console.log("🗑️ Cleared authentication");
        window.location.reload();
    };

    return (
        <div className="fixed top-4 right-4 bg-yellow-100 p-4 rounded shadow-lg z-50">
            <h3 className="font-bold text-sm mb-2">Auth Debug</h3>
            <button
                onClick={checkAuth}
                className="bg-blue-500 text-white px-2 py-1 rounded text-xs mr-2"
            >
                Check Auth
            </button>
            <button
                onClick={clearAuth}
                className="bg-red-500 text-white px-2 py-1 rounded text-xs"
            >
                Clear Auth
            </button>
        </div>
    );
}
