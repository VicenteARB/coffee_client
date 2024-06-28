import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import 'bootstrap/dist/css/bootstrap.min.css';
import './RegisterPage.css';
import { toast } from 'react-toastify';
import { registerAccount } from "../services/api"; 



function RegisterPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const register = async () => {
        if (!username || !email || !password) {
            toast.warn('Por favor, completa todos los campos');
            return; 
        }

        try {
            const salt = bcrypt.genSaltSync(12);
            const hashedPassword = bcrypt.hashSync(password, salt);

            const userData = {
                username: username,
                email: email,
                password: hashedPassword,
                disabled: 0,
                locked: 0
            };

            const resp = await registerAccount(userData);

            if (resp) {
                navigate("/login");
                toast.success('Cuenta creada con éxito');
            } else {
                console.log(resp);
                toast.error("Error al crear la cuenta. Por favor, intenta de nuevo.");
            }
        } catch (error) {
            toast.error("Error al procesar la solicitud. Por favor, intenta de nuevo.");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-start login-container vh-100">
            <div className="card p-4" style={{ minWidth: '300px' }}>
                <h1 className="text-center mb-4">Registro</h1>
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
                        type="email" 
                        className="form-control mb-3" 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="Email" 
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
                <button className="btn btn-block register-button mb-3" onClick={register}>Registrar</button>
                <button className="btn btn-block back-button mb-3" onClick={() => navigate("/login")}>Volver</button> {/* Cambié la acción del botón Volver para redirigir a login */}
            </div>
        </div>
    );
}

export { RegisterPage };
