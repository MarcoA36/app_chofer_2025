import { useState } from "react";
import { useData } from "../../../../context/DataContext";
import {
  ingresarDestinoRequest,
  ingresarImporteRequest,
} from "../../../../api/data";

import Loader from "../../../../componentes/Loader";
import InfoViaje from "./InfoViaje";
import IngresarDestino from "./IngresarDestino";
import IngresarImporte from "./IngresarImporte";

import "./ViajeAsignado.css";

const ViajesPendientes = () => {
  const {
    viajesOrdenados,
    actualizarViajePendiente,
    agregarViajeCompletados,
    eliminarViajePendiente,
    loadingData,
    movil,
    actualizarUbicacion,
  } = useData();

  const [loadingField, setLoadingField] = useState("");

  const principal = viajesOrdenados?.principal;
  const cola = viajesOrdenados?.cola;

  const handleSaveDestino = async (newDestino, viajeId) => {
    if (!newDestino.trim()) return;

    setLoadingField(`destino-${viajeId}`);

    try {
      const response = await ingresarDestinoRequest(
        principal.id,
        principal.id_zona,
        newDestino,
        null,
        movil.id_movil
      );

      if (response.success) {
        actualizarViajePendiente(viajeId, {
          destino: newDestino,
          id_zona_destino: response.data.id_zona_destino,
        });
      }
    } catch (error) {
      console.error("Error al guardar el destino:", error);
    } finally {
      setLoadingField("");
    }
  };

  const handleSaveImporte = async (newImporte, viajeId) => {
    if (!newImporte) return;

    setLoadingField(`importe-${viajeId}`);

    try {
      const response = await ingresarImporteRequest(
        viajeId,
        newImporte,
        movil.id_movil,
        principal.id_zona,
        principal.id_zona_destino
      );

      if (response.success) {
        actualizarViajePendiente(viajeId, { importe: newImporte });
        agregarViajeCompletados(response.data);
        actualizarUbicacion(response.data.id_zona_movil);
      }
    } catch (error) {
      console.error("Error al guardar el importe:", error);
    } finally {
      setLoadingField("");
    }
  };

  if (loadingData) return <Loader />;

  return (
    <div className="viaje-asignado px-2">
      {principal ? (
        <div key={principal.id} className="card-viaje-asignado px-2 py-1">
          <InfoViaje viaje={principal} />

          <IngresarDestino
            viaje={principal}
            loading={loadingField === `destino-${principal.id}`}
            onSave={handleSaveDestino}
          />

          <IngresarImporte
            importe={principal.importe}
            viajeId={principal.id}
            loading={loadingField === `importe-${principal.id}`}
            onSave={handleSaveImporte}
            onFinalizar={eliminarViajePendiente}
          />
        </div>
      ) : (
        // <div className="alert alert-secondary text-center fw-medium">
        //   No tienes viajes asignados
        // </div>
        // <InfoEstadoMovil />
        ""
      )}

      {cola && (
        <div className="card-viaje-asignado bg-danger p-2 text-center">
          <h6 className="mb-1 text-light fw-bold">Próximo viaje</h6>
          <p className="mb-0 fs-5 fw-bold text-warning">{cola.origen}</p>
        </div>
      )}
    </div>
  );
};

export default ViajesPendientes;
