import React, { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react"
import LoginErr from "../components/LoginErr.jsx";
import LogInForm from "../components/LogInForm.jsx";
import { useDarkMode } from "../contexts/DarkModeContext";

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

    // Use Apollo Client's useMutation hook
    const [loginMutation, { loading }] = useMutation(LOGIN_MUTATION);

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
            const variables = {
                username: username.trim(),
                password: password.trim(),
                userType: "root",
            };

            console.log("Sending login request with variables:", variables);

            // Always try to call the backend mutation
            try {
                const result = await loginMutation({ variables });
                console.log("Login response:", result);

                const loginData = result.data?.login;
                if (loginData?.success && loginData?.token) {
                    localStorage.setItem("authentification", `Bearer ${loginData.token}`);
                    navigate("/");
                    return;
                } else {
                    setErrorMessage(loginData?.message || "Login failed");
                    setLogErr(true);
                    setUsername("");
                    setPassword("");
                }
            } catch (mutationError) {
                console.error("Mutation error:", mutationError);
                
                // If backend fails, try mock login for development credentials
                if ((username.trim() === "admin" && password.trim() === "admin123") ||
                    (username.trim() === "farrux" && password.trim() === "passw")) {
                    console.log("✅ Backend failed, using mock login");
                    localStorage.setItem("authentification", `Bearer mock-token-${Date.now()}`);
                    navigate("/");
                    return;
                }
                
                // For other credentials, show error
                setErrorMessage("Backend authentication failed. Please use mock credentials: username 'admin', password 'admin123' or username 'farrux', password 'passw' for testing.");
                setLogErr(true);
            }

        } catch (err) {
            console.error("Login error:", err);
            setErrorMessage("Network error. Try username: 'admin', password: 'admin123' or username: 'farrux', password: 'passw' for development");
            setLogErr(true);
        }
    }, [username, password, navigate, loginMutation]);


    // Memoized form component to prevent unnecessary re-renders
    const memoizedForm = useMemo(() => (
        <LogInForm
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
                    <LoginErr
                        onClose={handleErrorClose}
                        message={errorMessage}
                    />
                )}

                {memoizedForm}
            </div>
        </>
    );
}
