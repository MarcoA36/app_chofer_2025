import { FaMapMarkerAlt, FaMapMarkedAlt } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import EditableField from "../EditableField/EditableField";
import { useNavigate } from "react-router-dom";
import { useZona } from "../../../../context/ZonaContext";

const IngresarDestino = ({ loading, onSave, viaje }) => {
  const navigate = useNavigate();
  const { zonas } = useZona();

  const zonaDestino = zonas.find((z) => z.id_zona === viaje.id_zona_destino);

  return (
    <div className="card-box">
      {zonaDestino ? (
        <p
          className="mb-3 fw-medium bg-success text-light p-2 rounded border"
          style={{ fontSize: "0.95rem" }}
        >
          <strong>TERMINA EL VIAJE</strong> en
        </p>
      ) : (
        <p
          className="mb-3 fw-medium bg-warning p-2 rounded border border-warning"
          style={{ fontSize: "0.95rem" }}
        >
          <strong>INGRESE EL DESTINO</strong> cuando el pasajero se lo indique.
        </p>
      )}

      {/* Dirección */}
      <div className="input-container d-flex align-items-center gap-3 border rounded mb-2">
        <FaMapMarkerAlt size={22} color="#0d6efd" />
        <EditableField
          value={viaje.destino}
          placeholder="Ingresar dirección"
          onSave={(newValue) => onSave(newValue, viaje.id)}
          loading={loading}
        />
        {loading && <ImSpinner2 className="spinner text-primary" size={20} />}
      </div>

      {/* Zona */}
      <div
        className="input-container d-flex align-items-center fs-4 gap-3 border rounded"
        onClick={() => navigate("/mapa")}
      >
        <FaMapMarkedAlt size={22} color="#0d6efd" />
        {zonaDestino ? (
          <>
            {zonaDestino.nombre}
          </>
        ) : (
          "Ingresar zona"
        )}
      </div>
    </div>
  );
};

export default IngresarDestino;
