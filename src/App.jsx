import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
// import Home from "./vistas/Home/Home";
import Login from "./vistas/Login/Login";
import TablaViajes from "./vistas/Viajes/TablaViajes";
import Mapa from "./vistas/Mapa/Mapa";
import Dashboard from "./vistas/Dashboard/Dashboard";
import PrivateRoutes from "./PrivateRoutes";
// import ProtectedLayout from "./vistas/ProtectedLayout";
import Home from "./vistas/Home/Home";

function App() {
  return (

      <div className="App">
        <div className="app_container">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<Home />}>
                <Route index element={<Dashboard />} />
                <Route path="/viajes-completados" element={<TablaViajes />} />
                <Route path="/mapa" element={<Mapa/>} />
              </Route>
            </Route>
          </Routes>
        </div>
      </div>

  );
}

export default App;
