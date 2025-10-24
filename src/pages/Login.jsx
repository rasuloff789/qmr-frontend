import React, { useState, useCallback, useMemo } from "react";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { useNavigate } from "react-router-dom";
import LoginErr from "../components/LoginErr.jsx";
import LogInForm from "../components/LogInForm.jsx";

const LOGIN = gql`
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
    const [LoginAuth, { loading, error, data }] = useMutation(LOGIN);

    // Memoized error handler
    const handleErrorClose = useCallback(() => {
        setLogErr(false);
        setErrorMessage("");
    }, []);

    // Optimized form submission with proper error handling
    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

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

            const res = await LoginAuth({
                variables,
            });

            console.log("Login response:", res);

            const loginData = res.data?.login;
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
            setErrorMessage(err.message || "Network error occurred");
            setLogErr(true);
        }
    }, [username, password, LoginAuth, navigate]);


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
            <div className="min-h-screen flex items-center justify-center bg-green-200">
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
