
import { useData } from "../context/DataContext"

const InfoTurno = () => {
  const {viajesCompletados, totalImportes} = useData()
  return (
    <div className="ultimo_viaje mt-2 py-2 rounded text-center">
    <p>
      Viajes realizados: <span>{viajesCompletados.length}</span>
    </p>
    <p>
      Caja total: <span>{totalImportes}</span>
    </p>
  </div>
  )
}

export default InfoTurno