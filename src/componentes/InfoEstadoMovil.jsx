import { Link } from "react-router-dom";
import { useData } from "../context/DataContext";
import { useZona } from "../context/ZonaContext";

const InfoEstadoMovil = () => {
  const { viajesOrdenados } = useData();
  const { principal } = viajesOrdenados || {};
  const { zonaActual } = useZona();

  if (principal) {
    const { origen, destino } = principal;
    return (
      <Link to="/" className="text-decoration-none">
        <div className="alert alert-warning mb-1 cursor-pointer">
          <strong>Viaje asignado en </strong>
          <span className="fs-5"> {origen}</span>
         
          {destino && (
            <>
              {" "}
              <strong>con destino </strong>
              <span className="fs-5"> {destino}</span>
            </>
          )}
        </div>
      </Link>
    );
  }

  if (zonaActual) {
    return (
      <Link to="/mapa" className="text-decoration-none">
        <div className="alert alert-success mb-1 cursor-pointer">
          <strong>Libre en zona:</strong> {zonaActual.nombre}
        </div>
      </Link>
    );
  }

  return <div className="alert alert-warning mb-2">Zona desconocida</div>;
};

export default InfoEstadoMovil;
