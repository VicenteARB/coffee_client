// import logo from './logo.svg';
import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { Page1 } from "./pages/Page1";
import { Page2 } from "./pages/Page2";
import { Menu } from "./components/Menu";
import { Cursos } from "./pages/Cursos";
import { MiCurso } from "./components/MiCurso";
import { AuthProvider } from "./auth/AuthContext";
import { LoginPage } from "./pages/LoginPage";
import { CreateCoffeePage } from "./pages/CreateCoffeePage";
import { PrivateRoute } from "./auth/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Menu />
        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/page1" element={<Page1 />} />

          <Route path="/page2" element={<Page2 />} />

          <Route path="/cursos" element={<Cursos />}>
            <Route path=":url" element={<MiCurso />} />
          </Route>

          <Route path="/login" element={<LoginPage />} />

          <Route path="/nuevo-cafe" element={<PrivateRoute><CreateCoffeePage /></PrivateRoute>}/>

          <Route path="*" element={<p>Ups, no existe la ruta</p>} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
