import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';

function Menu() {
  const { auth, logout } = React.useContext(AuthContext);
  const navigate = useNavigate(); // Hook para redirigir
  const routes = [];

  if (auth.token) {
    routes.splice(0, routes.length);
    routes.push({ to: "/", text: "Home" });
    routes.push({ to: "/nuevo-cafe", text: "Crear café" });
  }

  const cerrarSesion = () => {
    logout();
    navigate("/login"); 
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink className="navbar-brand" to="/">MiApp</NavLink>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
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
          <button className="btn btn-outline-danger" onClick={cerrarSesion} style={{ marginRight: '5px' }}>
            Cerrar sesión
          </button>
        )}
      </div>
    </nav>
  );
}

export { Menu };
