// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import { useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
    const userGuardado = localStorage.getItem("usuario");
    if (userGuardado) setUsuario(JSON.parse(userGuardado));
    }, []);

    const login = (datosUsuario) => {
    localStorage.setItem("usuario", JSON.stringify(datosUsuario));
    setUsuario(datosUsuario);
    };

    const logout = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
    };

    return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
        {children}
    </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

