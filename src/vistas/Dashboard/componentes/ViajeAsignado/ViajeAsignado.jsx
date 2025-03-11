import { useState } from "react";
import { useData } from "../../../../context/DataContext";
import EditableField from "../EditableField/EditableField";
import { FaMapMarkerAlt, FaMoneyBillWave } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import "./ViajeAsignado.css";
import { editarViajeRequest, ingresarImporteRequest } from "../../../../api/data";

const ViajesPendientes = () => {
  const { viajesPendientes, actualizarViajePendiente, agregarViajeCompletados, eliminarViajePendiente } = useData();
  const [loadingField, setLoadingField] = useState("");

  const handleSaveDestino = async (newDestino, viajeId) => {
    
    if (!newDestino.trim()) {
      return;
    }
    
    setLoadingField(`destino-${viajeId}`);

    console.log(newDestino)
    try {
      const response = await editarViajeRequest(viajeId, newDestino);
      console.log(response)
      if (response.success) {
        actualizarViajePendiente(viajeId, { destino: newDestino });
        console.log(`Destino actualizado: ${newDestino} para viaje ${viajeId}`);
      }
      console.log(`Destino actualizado: ${newDestino} para viaje ${viajeId}`);
    } catch (error) {
      console.error("Error al guardar el destino:", error);
    } finally {
      setLoadingField("");
    }
  };

  const handleSaveImporte = async (newImporte, viajeId) => {
    if (!newImporte) {
      return;
    }
    setLoadingField(`importe-${viajeId}`);

   
    console.log(newImporte)
    try {
      const response = await ingresarImporteRequest(viajeId, newImporte);
      console.log(response.success)
      if (response.success) {
        actualizarViajePendiente(viajeId, { importe: newImporte });
        agregarViajeCompletados(response.data);
        console.log(`Importe actualizado: ${newImporte} para viaje ${viajeId}`);
      }
      console.log(`Importe actualizado: ${newImporte} para viaje ${viajeId}`);
    } catch (error) {
      console.error("Error al guardar el importe:", error);
    } finally {
      setLoadingField("");
    }
  };

  return (
    <div className="viaje-asignado my-2 py-2 rounded text-center h-100">
          <div className="admin-message bg-warning text-dark rounded p-3 my-3 shadow-sm">
        <strong>📢 Mensaje del admin:</strong> Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </div>
      {viajesPendientes.length > 0 ? (
        viajesPendientes.map((viaje) => (
          <div key={viaje.id} className="card bg-dark shadow-md mb-4 rounded-lg p-4">
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="text-lg text-warning">{viaje.origen}</h3>
              <p className="fw-bold text-light">{viaje.fecha_asignado_time}</p>
            </div>

            <div className="card-inputs rounded text-light d-flex flex-column align-items-start gap-3 p-4">
              <div className="btn btn-dark fs-5 d-flex align-items-center gap-2">
                <FaMapMarkerAlt size={20} color="#0d6efd" />
                <EditableField
                  value={viaje.destino}
                  placeholder="Ingresar Destino"
                  onSave={(newValue) => handleSaveDestino(newValue, viaje.id)}
                  loading={loadingField === `destino-${viaje.id}`}
                />
                {loadingField === `destino-${viaje.id}` && (
                  <ImSpinner2 className="spinner text-warning" size={20} />
                )}
              </div>
              <div className="btn btn-dark fs-5 d-flex align-items-center gap-2">
                <FaMoneyBillWave size={20} color="#28a745" />
                <EditableField
                  value={viaje.importe}
                  placeholder="Ingresar Importe"
                  type="number"
                  onSave={(newValue) => handleSaveImporte(newValue, viaje.id)}
                  loading={loadingField === `importe-${viaje.id}`}
                />
                {loadingField === `importe-${viaje.id}` && (
                  <ImSpinner2 className="spinner text-success" size={20} />
                )}
              </div>
            </div>
           {viaje.importe && (
                <button
                  className="btn btn-success mt-3 w-100"
                  onClick={() => eliminarViajePendiente(viaje.id)}
                >
                Finalizar
                </button>
              )}
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No tienes viajes asignados</p>
      )}
    </div>
  );
};

export default ViajesPendientes;






// import { useState } from "react";
// import { useData } from "../../../../context/DataContext";
// import EditableField from "../EditableField/EditableField";
// import { FaMapMarkerAlt, FaMoneyBillWave } from "react-icons/fa";
// import { ImSpinner2 } from "react-icons/im";
// import "./ViajeAsignado.css";
// import { editarViajeRequest, ingresarImporteRequest } from "../../../../api/data";

// const ViajesPendientes = () => {
//   const {
//     viajesPendientes,
//     actualizarViajePendiente,
//     agregarViajeCompletados,
//     eliminarViajePendiente,
//   } = useData();
//   const [loadingField, setLoadingField] = useState("");
//   const [mostrarFinalizar, setMostrarFinalizar] = useState({});

//   const handleSaveDestino = async (newDestino, viajeId) => {
//     if (!newDestino.trim()) {
//       alert("⚠️ El destino no puede estar vacío.");
//       return;
//     }
//     setLoadingField(`destino-${viajeId}`);
//     try {
//       const response = await editarViajeRequest(viajeId, newDestino);
//       if (response.success) {
//         actualizarViajePendiente(viajeId, { destino: newDestino });
//         console.log(`Destino actualizado: ${newDestino} para viaje ${viajeId}`);
//       }
//     } catch (error) {
//       console.error("Error al guardar el destino:", error);
//     } finally {
//       setLoadingField("");
//     }
//   };

//   const handleSaveImporte = async (newImporte, viajeId) => {
//     if (!newImporte || isNaN(newImporte) || Number(newImporte) <= 0) {
//       alert("⚠️ El importe debe ser un número válido y mayor a 0.");
//       return;
//     }
//     setLoadingField(`importe-${viajeId}`);
//     try {
//       const response = await ingresarImporteRequest(viajeId, newImporte);
//       if (response.success) {
//         actualizarViajePendiente(viajeId, { importe: newImporte });
//         agregarViajeCompletados(response.data);
//         setMostrarFinalizar((prev) => ({ ...prev, [viajeId]: true }));
//         console.log(`Importe actualizado: ${newImporte} para viaje ${viajeId}`);
//       }
//     } catch (error) {
//       console.error("Error al guardar el importe:", error);
//     } finally {
//       setLoadingField("");
//     }
//   };

//   return (
//     <div className="viaje-asignado m-2 p-2 rounded text-center h-100">
//       {viajesPendientes.length > 0 ? (
//         viajesPendientes.map((viaje) => (
//           <div key={viaje.id} className="card bg-dark shadow-md mb-4 rounded-lg p-4">
//             <div className="d-flex justify-content-between align-items-center">
//               <h3 className="text-lg text-warning">{viaje.origen}</h3>
//               <p className="fw-bold text-light">{viaje.fecha_asignado_time}</p>
//             </div>

//             <div className="card-inputs rounded text-light d-flex flex-column align-items-start gap-3 p-4">
//               <div className="btn btn-dark fs-5 d-flex align-items-center gap-2">
//                 <FaMapMarkerAlt size={20} color="#0d6efd" />
//                 <EditableField
//                   value={viaje.destino}
//                   placeholder="Ingresar Destino"
//                   onSave={(newValue) => handleSaveDestino(newValue, viaje.id)}
//                   loading={loadingField === `destino-${viaje.id}`}
//                 />
//                 {loadingField === `destino-${viaje.id}` && (
//                   <ImSpinner2 className="spinner text-warning" size={20} />
//                 )}
//               </div>
//               <div className="btn btn-dark fs-5 d-flex align-items-center gap-2">
//                 <FaMoneyBillWave size={20} color="#28a745" />
//                 <EditableField
//                   value={viaje.importe}
//                   placeholder="Ingresar Importe"
//                   type="number"
//                   onSave={(newValue) => handleSaveImporte(newValue, viaje.id)}
//                   loading={loadingField === `importe-${viaje.id}`}
//                 />
//                 {loadingField === `importe-${viaje.id}` && (
//                   <ImSpinner2 className="spinner text-success" size={20} />
//                 )}
//               </div>

//               {mostrarFinalizar[viaje.id] && (
//                 <button
//                   className="btn btn-success mt-3"
//                   onClick={() => eliminarViajePendiente(viaje.id)}
//                 >
//                   ✅ Finalizar
//                 </button>
//               )}
//             </div>
//           </div>
//         ))
//       ) : (
//         <p className="text-center text-gray-500">No tienes viajes asignados</p>
//       )}

//       <div className="admin-message bg-warning text-dark rounded p-3 mt-3 shadow-sm">
//         <strong>📢 Mensaje del admin:</strong> Lorem ipsum dolor sit amet consectetur adipisicing elit.
//       </div>
//     </div>
//   );
// };

// export default ViajesPendientes;
