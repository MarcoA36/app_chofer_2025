import { useData } from "../../../context/DataContext";

const UltimoViaje = () => {
  const { viajes } = useData();
  const ultimoViaje = viajes.length > 0 ? viajes[0] : null;

  return (
    <div className="ultimo_viaje m-2 p-2 rounded text-center">
      <h5>Último viaje</h5>
      {ultimoViaje ? (
        <div className="row">
          <div className="col-6">
            <p>
              Origen: <span>{ultimoViaje.origen}</span>
            </p>
            <p>
              Destino: <span>{ultimoViaje.destino || "?"}</span>
            </p>
          </div>
          <div className="col-6">
            <p>
             {ultimoViaje.fecha_completado_time}
            </p>
            <p>
              $ {ultimoViaje.importe}
            </p>
          </div>
        </div>
      ) : (
        <p>No hay viajes recientes</p>
      )}
    </div>
  );
};

export default UltimoViaje;
