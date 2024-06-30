import React from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = React.useState({ token: null });

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuth({ token: token });
    }
  }, []);

  const setToken = async (token) => {
    localStorage.setItem("token", token);
    setAuth({ token: token });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuth({ token: null });
  };

  const getDecodedToken = () => {
    if (!auth.token) {
      return null;
    }
    try {
      return jwtDecode(auth.token);
    } catch (error) {
      console.error("Error decoding token", error);
      return null;
    }
  };

  const getRoleAndUsername = () => {
    const decodedToken = getDecodedToken();
    if (decodedToken) {
      return {
        role: decodedToken.role,
        username: decodedToken.sub,
      };
    }
    return null;
  };

  const getToken = () => auth.token;

  return (
    <AuthContext.Provider value={{ auth, setToken, logout, getRoleAndUsername, getToken }}>
      {children}
    </AuthContext.Provider>
  );
}
