import React, { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react"
import LoginError from "../../components/auth/LoginError.jsx";
import LoginForm from "../../components/auth/LoginForm.jsx";
import { useDarkMode } from "../../contexts/DarkModeContext";

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!, $userType: String!) {
    login(username: $username, password: $password, userType: $userType) {
      token
      message
      success
    }
  }
`;

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [logErr, setLogErr] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();
    const { isDarkMode } = useDarkMode();

    // Get userType from subdomain
    const getUserTypeFromSubdomain = () => {
        const host = window.location.hostname;
        const parts = host.split(".");

        // If hostname has at least 3 parts (e.g., root.elli.uz)
        if (parts.length >= 3) {
            return parts[0]; // root or admin or teacher
        }

        // Fallback to environment variable for mock/development
        return import.meta.env.VITE_SUBDOMAIN || "root"; // default to root
    };

    // Use Apollo Client's useMutation hook with error policy
    const [loginMutation, { loading, error }] = useMutation(LOGIN_MUTATION, {
        errorPolicy: 'all'
    });

    // Memoized error handler
    const handleErrorClose = useCallback(() => {
        setLogErr(false);
        setErrorMessage("");
    }, []);

    // Optimized form submission with proper error handling
    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        console.log("🚀 Login form submitted");

        // Clear previous errors
        setLogErr(false);
        setErrorMessage("");

        // Basic validation
        if (!username.trim() || !password.trim()) {
            setErrorMessage("Please fill in all fields");
            setLogErr(true);
            return;
        }

        // Additional validation to prevent empty requests
        if (username.trim().length === 0 || password.trim().length === 0) {
            setErrorMessage("Username and password cannot be empty");
            setLogErr(true);
            return;
        }

        try {
            const userType = getUserTypeFromSubdomain();
            console.log("🔍 Detected userType from subdomain:", userType);
            
            const variables = {
                username: username.trim(),
                password: password.trim(),
                userType: userType,
            };

            console.log("Sending login request with variables:", variables);

            // Call the backend mutation
            const result = await loginMutation({ variables });
            console.log("Login response:", result);

            const loginData = result.data?.login;
            if (loginData?.success && loginData?.token) {
                localStorage.setItem("authentification", `Bearer ${loginData.token}`);
                navigate("/");
            } else {
                setErrorMessage(loginData?.message || "Login failed");
                setLogErr(true);
                setUsername("");
                setPassword("");
            }

        } catch (err) {
            console.error("Login error:", err);

            // Check for specific error types
            if (err.networkError?.statusCode === 500) {
                setErrorMessage("Backend server error (500). Please contact the administrator.");
            } else if (err.networkError) {
                setErrorMessage("Network error. Please check your connection.");
            } else if (err.graphQLErrors && err.graphQLErrors.length > 0) {
                setErrorMessage(err.graphQLErrors[0].message);
            } else {
                setErrorMessage("An unexpected error occurred. Please try again.");
            }

            setLogErr(true);
        }
    }, [username, password, navigate, loginMutation]);


    // Memoized form component to prevent unnecessary re-renders
    const memoizedForm = useMemo(() => (
        <LoginForm
            handleSubmit={handleSubmit}
            username={username}
            setUsername={setUsername}
            setPassword={setPassword}
            password={password}
            loading={loading}
        />
    ), [handleSubmit, username, password, loading]);

    return (
        <>
            <div
                className="min-h-screen flex items-center justify-center bg-green-200 dark:bg-gray-900"
                style={{
                    backgroundColor: isDarkMode ? '#111827' : '#dcfce7'
                }}
            >
                {logErr && (
                    <LoginError
                        onClose={handleErrorClose}
                        message={errorMessage}
                    />
                )}

                {memoizedForm}
            </div>
        </>
    );
}
