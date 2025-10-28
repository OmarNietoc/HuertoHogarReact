// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

// ⬅️ Exportamos el contexto con un valor inicial seguro
// (si algún componente se renderiza sin Provider, no se rompe al hacer destructuring)
export const AuthContext = createContext({
  usuario: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    try {
      const userGuardado = localStorage.getItem("usuario");
      if (userGuardado) setUsuario(JSON.parse(userGuardado));
    } catch {
      // ignorar errores de parseo/localStorage en entornos de test
    }
  }, []);

  const login = (datosUsuario) => {
    try {
      localStorage.setItem("usuario", JSON.stringify(datosUsuario));
    } catch {
      /* noop en test */
    }
    setUsuario(datosUsuario);
  };

  const logout = () => {
    try {
      localStorage.removeItem("usuario");
    } catch {
      /* noop en test */
    }
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

// (Opcional) si en algún sitio importabas por defecto:
// export default AuthProvider;
