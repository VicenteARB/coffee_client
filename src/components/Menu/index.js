import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import './Menu.css';
import logo from '../../img/logo.png'; 

function Menu() {
  const { auth, logout, getRoleAndUsername } = React.useContext(AuthContext);
  const navigate = useNavigate(); 
  const routes = [];
  routes.push({ to: "/coffees", text: "Coffees" });
  routes.push({ to: "/acerca-de", text: "Acerca de" });

  const userInfo = getRoleAndUsername();
  console.log(userInfo);

  if (!auth.token) {
    routes.push({ to: "/login", text: "Iniciar sesión" });
    routes.push({ to: "/register", text: "Regístrate" });
  }

  if (userInfo) {
    if (userInfo.role === "ADMIN") {
      routes.push({ to: "/nuevo-cafe", text: "Gestión coffees" });
      routes.push({ to: "/gestion-clientes", text: "Gestión clientes" });
    } else if (userInfo.role === "CUSTOMER") {
      // Rutas específicas para el cliente.
    }
  }

  const cerrarSesion = () => {
    logout();
    navigate("/login"); 
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
