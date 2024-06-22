
import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./auth/AuthContext";
import { LoginPage } from "./pages/LoginPage";
import { CreateCoffeePage } from "./pages/CreateCoffeePage";
import { PrivateRoute } from "./auth/PrivateRoute";
import { Home } from "./pages/Home";

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/login" element={<LoginPage />} />

          <Route path="/nuevo-cafe" element={<PrivateRoute><CreateCoffeePage /></PrivateRoute>}/>

          <Route path="*" element={<p>Ups, no existe la ruta</p>} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
