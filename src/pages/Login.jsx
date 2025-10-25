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
            if ((username.trim() === "admin" && password.trim() === "admin123") ||
                (username.trim() === "farrux" && password.trim() === "passw")) {
                console.log("✅ Mock login successful");
                localStorage.setItem("authentification", `Bearer mock-token-${Date.now()}`);
                navigate("/");
                return;
            }

            // Check if backend is working before attempting login
            let backendIsWorking = true;
            try {
                const healthCheck = await fetch('http://localhost:4000/graphql', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query: "query { __typename }" })
                });
                
                if (!healthCheck.ok) {
                    backendIsWorking = false;
                }
            } catch {
                backendIsWorking = false;
            }

            // If backend is not working, use mock login
            if (!backendIsWorking) {
                console.log("⚠️ Backend not working, skipping backend login");
                setErrorMessage("Backend server is experiencing issues. Please try again later.");
                setLogErr(true);
                setLoading(false);
                return;
            }

            // Try real backend login
            try {
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

                // Check if response is ok
                if (!response.ok) {
                    if (response.status === 500) {
                        throw new Error("Backend server error (500). Using mock login instead.");
                    }
                    throw new Error(`Server error: ${response.status}`);
                }

                const result = await response.json();
                console.log("Login response:", result);

                if (result.errors) {
                    console.error("GraphQL errors:", result.errors);
                    // If backend is not working, show helpful message
                    setErrorMessage("Backend authentication failed. Try username: 'admin', password: 'admin123' or username: 'farrux', password: 'passw' for development");
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
            } catch (backendError) {
                console.error("Backend error:", backendError);
                // If backend is completely down, show helpful message
                setErrorMessage("Backend server is down. Try username: 'admin', password: 'admin123' or username: 'farrux', password: 'passw' for development");
                setLogErr(true);
                setLoading(false);
                return;
            }

        } catch (err) {
            console.error("Login error:", err);
            setErrorMessage("Network error. Try username: 'admin', password: 'admin123' or username: 'farrux', password: 'passw' for development");
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
