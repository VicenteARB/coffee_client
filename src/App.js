import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from "./auth/AuthContext";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { CreateCoffeePage } from "./pages/CreateCoffeePage";
import { PrivateRoute } from "./auth/PrivateRoute";
import { Home } from "./pages/Home";
import { Footer } from "./components/Footer/Footer";
import { ToastContainer } from 'react-toastify';
import { Menu } from "./components/Menu/index";

function App() {
  return (
    <AuthProvider>
      <HashRouter>
      <Menu></Menu >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/nuevo-cafe" element={<PrivateRoute><CreateCoffeePage /></PrivateRoute>} />
          <Route path="*" element={<p>Ups, no existe la ruta</p>} />
        </Routes>
        <Footer />
        <ToastContainer />
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
