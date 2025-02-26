// import { Link } from "react-router-dom"
import { useData } from "../context/DataContext"

const InfoTurno = () => {
  const {viajesCompletados, totalImportes} = useData()
  return (
    <div className="ultimo_viaje m-2 p-2 rounded text-center">
    <p>
      Viajes realizados: <span>{viajesCompletados.length}</span>
    </p>
    <p>
      Caja total: <span>{totalImportes}</span>
    </p>
    {/* <p>
      Con descuento: <span>{totalImportes * 0.8}</span>
    </p> */}

     {/* <Link to={"/viajes-completados"}>Ver detalles</Link> */}
  </div>
  )
}

export default InfoTurno