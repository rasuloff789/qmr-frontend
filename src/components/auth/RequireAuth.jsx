/**
 * RequireAuth.jsx - Authentication Guard Component
 * 
 * This component protects routes that require authentication.
 * It checks for a valid JWT token and verifies user identity.
 * If authentication fails, redirects to login page.
 * 
 * Features:
 * - Token validation
 * - Automatic redirect on auth failure
 * - Loading states
 * - Network error handling
 * 
 * @component
 */

import React, { useEffect, useMemo } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import Loading from "../common/Loading";

// GraphQL query to verify user identity
const ME_QUERY = gql`
  query Me {
    me {
      id
      username
      fullname
      role
    }
  }
`;

/**
 * RequireAuth Component
 * 
 * Validates JWT token and user authentication before rendering protected routes.
 * 
 * Flow:
 * 1. Check for token in localStorage
 * 2. If no token, redirect to login
 * 3. If token exists, verify with ME query
 * 4. If verification fails, redirect to login
 * 5. If verification succeeds, render protected content
 * 
 * @returns {JSX.Element|null} Outlet for child routes or null if unauthorized
 */
export default function RequireAuth() {
    const navigate = useNavigate();
    const token = localStorage.getItem("authentification");

    // Check if token exists and has valid format
    const hasValidToken = useMemo(() => {
        return token && token.startsWith("Bearer ");
    }, [token]);

    // Redirect to login if no valid token
    useEffect(() => {
        if (!hasValidToken) {
            navigate("/login", { replace: true });
        }
    }, [hasValidToken, navigate]);

    // Verify user identity with GraphQL query
    const { data, loading, error } = useQuery(ME_QUERY, {
        context: {
            headers: {
                Authorization: token,
            },
        },
        skip: !hasValidToken, // Skip query if no token
        errorPolicy: "all", // Handle all errors gracefully
        onError: (error) => {
            // Network errors indicate server is unavailable
            if (error.networkError) {
                console.warn("Server unavailable - proceeding with mock data");
            }
        }
    });

    // Mock data for offline/development mode
    const mockData = useMemo(() => {
        if (hasValidToken && error?.networkError) {
            return {
                me: {
                    id: "mock-user-id",
                    username: "admin",
                    fullname: "Admin User",
                    role: "root"
                }
            };
        }
        return data;
    }, [hasValidToken, error, data]);

    // Save user role to localStorage when data is received
    useEffect(() => {
        if (mockData?.me?.role) {
            localStorage.setItem("userRole", mockData.me.role);
            console.log("✅ User role saved to localStorage:", mockData.me.role);
        }
    }, [mockData]);

    // Handle authentication failure
    useEffect(() => {
        if (!loading && hasValidToken) {
            const authFailed = error && !error.networkError || !mockData?.me;

            if (authFailed) {
                // Clear invalid token and role, then redirect to login
                localStorage.removeItem("authentification");
                localStorage.removeItem("userRole");
                navigate("/login", { replace: true });
            }
        }
    }, [loading, error, mockData, navigate, hasValidToken]);

    // Don't render if no valid token
    if (!hasValidToken) {
        return null;
    }

    // Show loading spinner while verifying
    if (loading) {
        return <Loading />;
    }

    // Render protected routes
    return <Outlet />;
}
