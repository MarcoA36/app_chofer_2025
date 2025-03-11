import { Outlet } from "react-router-dom";
import Buttons from "../../componentes/Buttons";
import useSocketHandler from "../../hooks/socketHandler";
import { useData } from "../../context/DataContext";
import Loader from "../../componentes/Loader";
import InfoTurno from "../../componentes/InfoTurno";
import InfoMovil from "../../componentes/InfoMovil";

function Home() {
  const { loadingData } = useData();
  console.log("home renderizado");
  useSocketHandler();
  return (
    <>
      <InfoMovil />
      <div className="dashboard">
        {loadingData ? <Loader /> : <Outlet />}
      </div>
      <InfoTurno />
      <Buttons />
    </>
  );
}

export default Home;
