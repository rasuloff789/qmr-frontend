import React, { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react"
import LoginError from "../../components/auth/LoginError.jsx";
import LoginForm from "../../components/auth/LoginForm.jsx";
import { useDarkMode } from "../../contexts/DarkModeContext";
import { getSubdomainRole } from "../../utils/getSubdomainRole";

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
            const userType = getSubdomainRole();
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
                className="min-h-screen flex items-center justify-center relative"
                style={{
                    backgroundColor: isDarkMode ? '#111827' : '#f0fdf4'
                }}
            >
                {/* Subtle background gradient */}
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        background: isDarkMode
                            ? 'radial-gradient(circle at 20% 50%, #10b981 0%, transparent 50%), radial-gradient(circle at 80% 50%, #10b981 0%, transparent 50%)'
                            : 'radial-gradient(circle at 20% 50%, #16a34a 0%, transparent 50%), radial-gradient(circle at 80% 50%, #16a34a 0%, transparent 50%)'
                    }}
                ></div>

                <div className="relative z-10 px-4 w-full max-w-md">
                    {logErr && (
                        <LoginError
                            onClose={handleErrorClose}
                            message={errorMessage}
                        />
                    )}

                    {memoizedForm}
                </div>
            </div>
        </>
    );
}
