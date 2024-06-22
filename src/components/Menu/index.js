import React from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";

function Menu() {
  const { auth, logout } = React.useContext(AuthContext);

  if (auth.token) {
    routes.splice(0, routes.length);
    routes.push({ to: "/", text: "Home" });
    routes.push({ to: "/page1", text: "Pagina 1" });
    routes.push({ to: "/page2", text: "Pagina 2" });
    routes.push({ to: "/cursos", text: "Mis Cursos" });
    routes.push({ to: "/nuevo-cafe", text: "Crear café" });
  }


  const cerrarSesion = () =>{
    logout();
    routes.splice(0, routes.length);
    routes.push({ to: "/", text: "Home" });
    routes.push({ to: "/page1", text: "Pagina 1" });
    routes.push({ to: "/page2", text: "Pagina 2" });
    routes.push({ to: "/cursos", text: "Mis Cursos" });
    routes.push({ to: "/login", text: "Iniciar sesión" });
  }

  return (
    <>
      <h2>Menu</h2>
      <ul>
        {routes.map((item, index) => (
          <li key={index}>
            <NavLink
              style={({ isActive }) => ({ color: isActive ? "green" : "grey" })}
              to={item.to}
            >
              {item.text}
            </NavLink>
          </li>
        ))}

        {auth.token ? <button onClick={cerrarSesion}>Salir</button> : ""}
      </ul>
    </>
  );
}

const routes = [];

routes.push({ to: "/", text: "Home" });
routes.push({ to: "/page1", text: "Pagina 1" });
routes.push({ to: "/page2", text: "Pagina 2" });
routes.push({ to: "/cursos", text: "Mis Cursos" });
routes.push({ to: "/login", text: "Iniciar Sesion" });

export { Menu };
