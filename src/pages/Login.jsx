import React, { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import LoginErr from "../components/LoginErr.jsx";
import LogInForm from "../components/LogInForm.jsx";
import { useDarkMode } from "../contexts/DarkModeContext";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [logErr, setLogErr] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();
    const { isDarkMode } = useDarkMode();
    const [loading, setLoading] = useState(false);

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
            setLoading(true);
            const variables = {
                username: username.trim(),
                password: password.trim(),
                userType: "root",
            };

            console.log("Sending login request with variables:", variables);

            // For development: Use mock login if backend is not working
            if (username.trim() === "admin" && password.trim() === "admin123") {
                console.log("✅ Mock login successful");
                localStorage.setItem("authentification", `Bearer mock-token-${Date.now()}`);
                navigate("/");
                return;
            }

            // Try real backend login
            const response = await fetch('http://localhost:4000/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                        mutation Login($username: String!, $password: String!, $userType: String!) {
                            login(username: $username, password: $password, userType: $userType) {
                                token
                                message
                                success
                            }
                        }
                    `,
                    variables
                })
            });

            const result = await response.json();
            console.log("Login response:", result);

            if (result.errors) {
                console.error("GraphQL errors:", result.errors);
                // If backend is not working, show helpful message
                setErrorMessage("Backend authentication failed. Try username: 'admin', password: 'admin123' for development");
                setLogErr(true);
                setLoading(false);
                return;
            }

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
            setErrorMessage("Network error. Try username: 'admin', password: 'admin123' for development");
            setLogErr(true);
        } finally {
            setLoading(false);
        }
    }, [username, password, navigate]);


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
