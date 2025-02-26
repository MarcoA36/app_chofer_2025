import "./Info.css";
import { useData } from "../../context/DataContext";
import { useAuth } from "../../context/AuthContext";
// import InfoTurno from "./componentes/InfoTurno";
// import InfoMovil from "./componentes/InfoMovil";
import Loader from "../../componentes/Loader";
import InfoMovil from "../../componentes/InfoMovil";
import InfoTurno from "../../componentes/InfoTurno";

const Info = () => {
  const { user } = useAuth();
  const { viajes, totalImportes } = useData();

  if (!user) {
    return <Loader/>; 
  }

  return (
    <>
      <div className="info text-center">
        
        <InfoMovil user={user} />
        <InfoTurno {...{ viajes, totalImportes }} />
      </div>
    </>
  );
};

export default Info;

