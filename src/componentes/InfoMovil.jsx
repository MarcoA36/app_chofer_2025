import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import Loader from "./Loader";

const InfoMovil = () => {
  const { user } = useAuth()
  const { movil } = useData();

  if(!user) return <Loader />
  return (
    <div className="ultimo_viaje my-2 py-2 rounded text-center">
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
  )
}

export default InfoMovil