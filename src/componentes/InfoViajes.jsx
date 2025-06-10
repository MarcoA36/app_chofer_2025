import { useData } from "../context/DataContext";

const InfoViajes = ({principal, cola}) => {
    // const { viajesOrdenados } = useData();
    // const { principal, cola } = viajesOrdenados || {};
  
    return (
      <div className="bg-dark p-3 text-white rounded">
        {principal ? (
          <>
            <div className="mb-2">
              <strong className="text-warning">Viaje asignado en:</strong><br />
              {principal.origen || "Sin dirección"}
            </div>
  
            <div className="mb-2">
              <strong className="text-primary">En curso hacia:</strong><br />
              {principal.destino || "Sin destino"}
            </div>
  
            {cola && (
              <div>
                <strong>En cola:</strong><br />
                {cola.origen || "Sin dirección"}
              </div>
            )}
          </>
        ) : (
          <p className="text-white">No hay viajes asignados.</p>
        )}
      </div>
    );
  };
  export default InfoViajes;
  