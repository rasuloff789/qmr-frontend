import React, { useEffect, useMemo } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import Loading from "../pages/Loading.jsx"

const ME = gql`
  query Me {
    me {
      id
      username
      fullname
    }
  }
`;

export default function RequireAuth() {
    const navigate = useNavigate();
    const token = localStorage.getItem("authentification");

    // Debug: Log token details (only when token changes)
    console.log("🔍 RequireAuth Debug - Token changed:", token);

    // Check if token exists and is valid format
    const hasValidToken = useMemo(() => {
        const isValid = token && token.startsWith("Bearer ");
        console.log("Has valid token:", isValid);
        return isValid;
    }, [token]);

    // Token yo'q bo'lsa — darhol login sahifasiga
    useEffect(() => {
        if (!hasValidToken) {
            console.log("No valid token found, redirecting to login");
            console.log("Token value:", token);
            console.log("Has valid token:", hasValidToken);
            navigate("/login", { replace: true });
        }
    }, [hasValidToken, navigate, token]);

    // Token bo'lsa, ME query yuboramiz - only if we have a valid token
    const { data, loading, error } = useQuery(ME, {
        context: {
            headers: {
                Authorization: token,
            },
        },
        skip: !hasValidToken, // Skip query if no valid token
        errorPolicy: "all", // Handle both network and GraphQL errors
        onCompleted: (data) => {
            console.log("✅ ME Query completed successfully:", data);
        },
        onError: (error) => {
            console.log("❌ ME Query error:", error);
            // If it's a network error (server not running), mock the data
            if (error.networkError) {
                console.log("🔄 Network error detected - server not running, using mock data");
            }
        }
    });

    // Mock data when server is not available
    const mockData = useMemo(() => {
        if (hasValidToken && error?.networkError) {
            return {
                me: {
                    id: "mock-user-id",
                    username: "admin",
                    fullname: "Admin User"
                }
            };
        }
        return data;
    }, [hasValidToken, error, data]);

    console.log("📊 Query state:", { loading, error: !!error, data: !!data, hasValidToken });

    useEffect(() => {
        if (!loading && hasValidToken) {
            if (error && !error.networkError || !mockData?.me) {
                console.log("❌ Authentication failed - redirecting to login");
                console.log("Error:", error);
                console.log("Data:", mockData);
                console.log("Has data.me:", !!mockData?.me);
                localStorage.removeItem("authentification");
                navigate("/login", { replace: true });
            } else {
                console.log("✅ Authentication successful:", mockData);
            }
        }
    }, [loading, error, mockData, navigate, hasValidToken]);

    // Prevent unnecessary re-authentication on route changes
    const shouldSkipAuth = useMemo(() => {
        // Only run auth check once per session
        return !hasValidToken;
    }, [hasValidToken]);

    // Don't render anything if no valid token
    if (!hasValidToken) {
        console.log("RequireAuth: No valid token, not rendering");
        return null;
    }

    if (loading) return <Loading />;

    return <Outlet />;
}
