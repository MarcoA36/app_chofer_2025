// import { Outlet } from "react-router-dom";
// import Buttons from "../../componentes/Buttons";
// import useSocketHandler from "../../hooks/socketHandler";
// import { useData } from "../../context/DataContext";
// import Loader from "../../componentes/Loader";
// import InfoTurno from "../../componentes/InfoTurno";
// import InfoMovil from "../../componentes/InfoMovil";
// // import CardSolicitudViaje from "../../componentes/CardSolicitudViaje";
// import InfoUbicacion from "../../componentes/InfoUbicacion";

// function Home() {
//   const { loadingData, viajesPendientes } = useData();
//   console.log("home renderizado");
//   useSocketHandler();

//   return (
//     <>
//       <InfoMovil />
//       <InfoUbicacion/>
//       <div className="dashboard">
//         {loadingData ? <Loader /> : <Outlet />}
//       </div>
//       <InfoTurno />
//       <Buttons />
//     </>
//   );
// }

// export default Home;

import { Outlet } from "react-router-dom";
import Buttons from "../../componentes/Buttons";
import useSocketHandler from "../../hooks/socketHandler";
import { useData } from "../../context/DataContext";
import Loader from "../../componentes/Loader";
import InfoTurno from "../../componentes/InfoTurno";
import InfoMovil from "../../componentes/InfoMovil";
import InfoUbicacion from "../../componentes/InfoUbicacion";
import InfoHeader from "../../componentes/InfoHeader";
import InfoEstadoMovil from "../../componentes/InfoEstadoMovil";
import { useZona } from "../../context/ZonaContext";

function Home() {
  const { loadingData } = useData();
  const { loadingZonas } = useZona();

  const isLoading = loadingData || loadingZonas;
  console.log("home renderizado");
  useSocketHandler();
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <InfoHeader />
    
      <div className="dashboard">
        <Outlet />
      </div>
      <InfoEstadoMovil />
      <Buttons />
    </>
  );
}

export default Home;
