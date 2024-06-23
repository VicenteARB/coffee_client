import React, { useContext } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function PrivateRoute({ children }) {
    const { auth } = useContext(AuthContext);
    const location = useLocation();

    return auth.token ? (
        children
    ) : (
        <Navigate to="/" replace state={{ path: location.pathname }} />
    );
}

export { PrivateRoute };
