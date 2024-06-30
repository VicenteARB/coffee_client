import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from "./auth/AuthContext";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ClientsPage } from "./pages/ClientsPage";
import { CreateCoffeePage } from "./pages/CreateCoffeePage";
import { PrivateRoute } from "./auth/PrivateRoute";
import { Home } from "./pages/Home";
import { AboutUs } from "./pages/AboutUs";
import { Footer } from "./components/Footer/Footer";
import { ToastContainer } from 'react-toastify';
import { Menu } from "./components/Menu/index";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Coffees } from "./pages/Coffees";



function App() {
  return (
    <AuthProvider>
      <HashRouter>
      <Menu></Menu >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/acerca-de" element={<AboutUs />} />
          <Route path="/coffees" element={<Coffees />} />
          <Route path="/nuevo-cafe" element={<PrivateRoute><CreateCoffeePage /></PrivateRoute>} />
          <Route path="/gestion-clientes" element={<ClientsPage/>} />
          <Route path="*" element={<p>No existe la ruta</p>} />
        </Routes>
        <Footer />
        <ToastContainer />
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
