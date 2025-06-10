import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import InfoUbicacion from "./InfoUbicacion";
import Loader from "./Loader";

const InfoMovil = () => {
  const { user } = useAuth()
  const { movil } = useData();

  if(!user) return <Loader />
  return (
    <div className="header_info bg-dark my-2 py-1 rounded">
      <div className="info_movil">
      <p>
      Movil: <span>{movil.numero_movil}</span>
    </p>
    <p>
      Chofer:{" "}
      <span>
        {user.nombre} {user.apellido}
      </span>
    </p>
      </div>
      <InfoUbicacion/>
  
  </div>
  )
}

export default InfoMovil