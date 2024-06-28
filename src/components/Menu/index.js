import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { jwtDecode } from "jwt-decode";
import './Menu.css';
import logo from '../../img/logo.png'; // Importa la imagen del logo

function Menu() {
  const { auth, logout } = React.useContext(AuthContext);
  const navigate = useNavigate(); // Hook para redirigir
  const routes = [];
  routes.push({ to: "/coffees", text: "Coffees" });
  routes.push({ to: "/acerca-de", text: "Acerca de" });

  let decodedToken = null;

  if (auth.token) {
    console.log(auth.token);
    try {
      decodedToken = jwtDecode(auth.token);
    } catch (error) {
      console.error("Error decoding token", error);
    }
  } else {
    routes.push({ to: "/login", text: "Iniciar sesión" });
    routes.push({ to: "/register", text: "Regístrate" });
  }

  if (decodedToken) {
    if (decodedToken.role === "ADMIN") {
      routes.push({ to: "/nuevo-cafe", text: "Gestión coffees" });
      routes.push({ to: "/gestion-clientes", text: "Gestión clientes" });
    } else if (decodedToken.role === "CUSTOMER") {
      // Rutas específicas para el cliente si es necesario
    }
  }

  const cerrarSesion = () => {
    logout();
    navigate("/login"); // Redirigir a la página de inicio de sesión
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <NavLink className="navbar-brand" to="/">
        <img src={logo} alt="Logo" className="logo" />
      </NavLink>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          {routes.map((item, index) => (
            <li className="nav-item" key={index}>
              <NavLink className="nav-link" to={item.to}>
                {item.text}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="flex-grow-1"></div>
        {auth.token && (
          <button
            className="btn logout-button"
            onClick={cerrarSesion}
            style={{ marginRight: "10px" }}
          >
            Cerrar sesión
          </button>
        )}
      </div>
    </nav>
  );
}

export { Menu };
