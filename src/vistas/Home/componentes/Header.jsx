import InfoMovil from "../../../componentes/InfoMovil";
import InfoUbicacion from "../../../componentes/InfoUbicacion";
import Loader from "../../../componentes/Loader";
import { useAuth } from "../../../context/AuthContext";


const Header = () => {
  const { user } = useAuth();

  if (!user) return <Loader />;
  return (
    <div className="ultimo_viaje d-flex justify-content-beetween my-2 py-2 rounded text-center">
    <InfoMovil user={user}/>
      <InfoUbicacion/>
    </div>
  );
};

export default Header;
