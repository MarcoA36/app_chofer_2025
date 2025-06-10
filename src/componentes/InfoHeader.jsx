import { Link } from "react-router-dom";

import { useZona } from "../context/ZonaContext";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import Loader from "./Loader";
import {  FaTaxi, FaUser } from "react-icons/fa";
const InfoHeader = () => {
  const { user } = useAuth();
  const { movil, viajesOrdenados, viajesCompletados, totalImportes } =
    useData();
  const { zonaActual } = useZona();

  if (!user) return <Loader />;
  if (!zonaActual) return null;

  const { principal } = viajesOrdenados || {};
  const estaLibre = !principal;

  return (
    <div className="info-header bg-dark text-white rounded px-3 py-2 my-2 d-flex flex-wrap justify-content-between align-items-center flex-sm-row">
      {/* Móvil y Chofer */}
      <div className="info-movil text-center text-sm-start mb-2 mb-sm-0">
        <p className="mb-1 d-flex align-items-center gap-2">
          <FaTaxi />
          <span className="fw-bold">{movil.numero_movil}</span>
        </p>
        <p className="mb-0 d-flex align-items-center gap-2">
          <FaUser />
          <span className="fw-bold">
            {user.nombre} {user.apellido}
          </span>
        </p>
      </div>

      <Link
        to="/viajes-completados"
        className="text-decoration-none text-white"
      >
        {/* <div className="info-turno text-center mb-2 mb-sm-0 cursor-pointer">
          <p className="mb-1">
            Viajes: <span className="fw-bold">{viajesCompletados.length}</span>
          </p>
          <p className="mb-0">
            Caja: <span className="fw-bold">{totalImportes}</span>
          </p>
        </div> */}
        <div className="info-turno text-center mb-2 mb-sm-0 p-2 rounded border-secondary border border-2 shadow-sm transition">
    <p className="mb-1 d-flex justify-content-center align-items-center gap-2">
 
      <span className="fw-bold">{viajesCompletados.length} viajes</span>
    </p>
    <p className="mb-0 d-flex justify-content-center align-items-center gap-2">
    
      <span className="fw-bold">${totalImportes}</span>
    </p>
  </div>
      </Link>
    </div>
  );
};

export default InfoHeader;
