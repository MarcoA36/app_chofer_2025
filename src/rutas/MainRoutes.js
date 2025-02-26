import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "../PrivateRoutes";
import Home from "../vistas/Home/Home";
import Buttons from "../componentes/Buttons";
import Loader from "../componentes/Loader";

const Info = lazy(() => import("../vistas/Info/Info"));
const TablaViajes = lazy(() => import("../vistas/Viajes/TablaViajes"));
const Mapa = lazy(() => import("../vistas/Mapa/Mapa"));

const MainRoutes = () => (
  <Suspense fallback={<Loader />}>
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<Home />} />
        <Route path="/info" element={<Info />} />
        <Route path="/viajes-completados" element={<TablaViajes />} />
        <Route path="/mapa" element={<Mapa />} />
      </Route>
    </Routes>
    <Buttons />
  </Suspense>
);

export default MainRoutes;