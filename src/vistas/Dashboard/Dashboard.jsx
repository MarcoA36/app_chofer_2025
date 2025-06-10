import React from "react";
import "./Dashboard.css";
import ViajeAsignado from "./componentes/ViajeAsignado/ViajeAsignado";
// import Mapa from "../Mapa/Mapa";
// import ViajeEnCurso from "./componentes/ViajeAsignado/ViajeEnCuso";
// import { useData } from "../../context/DataContext";
// import InfoEstadoMovil from "../Mapa/componentes/InfoEstadoMovil";

const Dashboard = () => {
  // const { viajesOrdenados } = useData()
  // console.log("hay viaje: ", viajesOrdenados.principal)
  return (
    <>
      <div>
        <ViajeAsignado />
      </div>
    </>
  );
};

export default Dashboard;
