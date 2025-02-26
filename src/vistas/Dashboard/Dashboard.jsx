import React from "react";
import "./Dashboard.css";
// import Mensaje from "./componentes/Mensaje";
// import Accion from "./componentes/Accion";
// import ButtonsDash from "./componentes/ButtonsDash";
// import UltimoViaje from "./componentes/UltimoViaje";
import InfoMovil from "../../componentes/InfoMovil";
import InfoTurno from "../../componentes/InfoTurno";
import ViajeAsignado from "./componentes/ViajeAsignado/ViajeAsignado";
// import ButtonsDash from "./componentes/ButtonsDash";

const Dashboard = () => {
  return (
    <>
      <div className="dashboard">
        {/* <Mensaje /> */}
        <InfoMovil />
        <ViajeAsignado />
     
        {/* <UltimoViaje /> */}
        <InfoTurno />
        {/* <ButtonsDash /> */}

        {/* <Accion /> */}
      </div>
    </>
  );
};

export default Dashboard;
