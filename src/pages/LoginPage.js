import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { loginAccount } from "../services/api";
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import coffeeLogin from '../img/coffee_login.png';
import './LoginPage.css';

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
            toast.error('Error', 'Credenciales incorrectas. Por favor, intenta de nuevo.');
        }
    };

    const goBack = () => {
        navigate("/");
    };

    return (
        <div className="d-flex justify-content-center align-items-start vh-100 login-container">
            <div className="card login-card p-0">
                <div className="row g-0">
                    <div className="col-md-6 d-flex justify-content-center align-items-center">
                        <div className="login-form-container p-4">
                            <h1 className="text-center mb-4">Iniciar Sesión</h1>
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
                            <button 
                                className="btn btn-block login-button mb-3"
                                onClick={login}
                            >
                                Login
                            </button>
                            <button 
                                className="btn btn-block back-button"
                                onClick={goBack}
                            >
                                Volver
                            </button>
                        </div>
                    </div>
                    <div className="col-md-6 login-image-container">
                        <img src={coffeeLogin} alt="Coffee Login" className="img-fluid login-image" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export { LoginPage };
