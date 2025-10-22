import React, { useState } from "react";
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
    const [logErr, setLogErr] = useState(false)
    const handleErrorClose = () => {
        setLogErr(false);
    };

    const navigate = useNavigate(); // ✅ hook
    const [LoginAuth, { loading, error, data }] = useMutation(LOGIN);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await LoginAuth({
                variables: {
                    username,
                    password,
                    userType: "root",
                },
            });
            const success = res.data?.login?.success;
            const token = res.data?.login?.token;

            if (success) {
                localStorage.setItem("authentification", `Bearer ${token}`);
                navigate("/"); // ✅ sahifaga o'tkazadi
            }
            else {
                setLogErr(true)
                setUsername("")
                setPassword("")
            }

        } catch (err) {
        }
    };


    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-green-200">

                {logErr && LoginErr(handleErrorClose)}

                {LogInForm({ handleSubmit, username, setPassword, setUsername, password, loading })}
            </div>
        </>
    );
}
