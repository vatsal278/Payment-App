"use client";

import { createContext, useContext, useState, useEffect } from "react";
import api from "@/lib/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadUser() {
            const token = localStorage.getItem("fc_token");
            if (token) {
                try {
                    const { data } = await api.get("/auth/me");
                    setUser(data.data.user);
                } catch (err) {
                    localStorage.removeItem("fc_token");
                }
            }
            setLoading(false);
        }
        loadUser();
    }, []);

    const login = async (email, password) => {
        const { data } = await api.post("/auth/login", { email, password });
        localStorage.setItem("fc_token", data.data.accessToken);
        setUser(data.data.user);
        return data.data.user;
    };

    const register = async (userData) => {
        const { data } = await api.post("/auth/register", userData);
        localStorage.setItem("fc_token", data.data.accessToken);
        setUser(data.data.user);
        return data.data.user;
    };

    const logout = () => {
        localStorage.removeItem("fc_token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
