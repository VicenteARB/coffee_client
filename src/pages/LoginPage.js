import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { loginAccount } from "../services/api";
import 'bootstrap/dist/css/bootstrap.min.css';

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { setToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const login = async () => {
        const resp = await loginAccount({ username, password });

        if (resp && resp.token) {
            await setToken(resp.token);
            navigate("/"); // Redirige a la página de inicio
        } else {
            setError("Credenciales incorrectas. Por favor, intenta de nuevo.");
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4" style={{ minWidth: '300px' }}>
                <h1 className="text-center mb-4">Login</h1>
                {error && <div className="alert alert-danger">{error}</div>} {/* Muestra el mensaje de error */}
                <div className="form-group">
                    <input 
                        type="text" 
                        className="form-control mb-3" 
                        onChange={(e) => setUsername(e.target.value)} 
                        placeholder="Username" 
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="password" 
                        className="form-control mb-3" 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Password" 
                    />
                </div>
                <button className="btn btn-primary btn-block" onClick={login}>Login</button>
            </div>
        </div>
    );
}

export { LoginPage };
