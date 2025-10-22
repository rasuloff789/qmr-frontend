import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import Loading from "../pages/Loading.jsx"

const ME = gql`
  query Me {
    me
  }
`;

export default function RequireAuth() {
    const navigate = useNavigate();
    const token = localStorage.getItem("authentification");

    // Token yo‘q bo‘lsa — darhol login sahifasiga
    useEffect(() => {
        if (!token) {
            navigate("/login", { replace: true });
        }
    }, [token, navigate]);

    // Token bo‘lsa, ME query yuboramiz
    const { data, loading, error } = useQuery(ME, {
        context: {
            headers: {
                Authorization: token,
            },
        },
        skip: !token, // token bo‘lmasa, so‘rov yuborilmaydi
    });

    useEffect(() => {
        if (!loading) {
            if (error || !data?.me) {
                localStorage.removeItem("authentification");
                navigate("/login", { replace: true });
            }
        }
    }, [loading, error, data, navigate]);

    if (loading) return <Loading />;

    return <Outlet />;
}
