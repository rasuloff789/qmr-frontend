import React from "react";
import { gql, useQuery } from "@apollo/client";

const ME_QUERY = gql`
    query Me {
        me {
            id
            username
            fullname
        }
    }
`;

export default function AuthDebug() {
    const { data, loading, error, refetch } = useQuery(ME_QUERY, {
        skip: true, // Don't run automatically
        errorPolicy: 'all'
    });

    const checkAuth = () => {
        const token = localStorage.getItem("authentification");
        console.log("🔍 Manual Auth Check:");
        console.log("Token:", token);
        console.log("Token type:", typeof token);
        console.log("Starts with Bearer:", token?.startsWith("Bearer "));
        console.log("All localStorage:", localStorage);

        // Use useQuery's refetch to test the ME query
        refetch()
            .then(({ data, error }) => {
                if (error) {
                    console.error("❌ ME Query Error:", error);
                } else {
                    console.log("🚀 ME Query Result:", data);
                }
            })
            .catch(err => {
                console.error("❌ ME Query Exception:", err);
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
            <div className="mb-2">
                <p className="text-xs text-gray-600">
                    {loading && "⏳ Query running..."}
                    {data && "✅ Query success"}
                    {error && "❌ Query error"}
                </p>
            </div>
            <button
                onClick={checkAuth}
                disabled={loading}
                className="bg-blue-500 text-white px-2 py-1 rounded text-xs mr-2 disabled:opacity-50"
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
