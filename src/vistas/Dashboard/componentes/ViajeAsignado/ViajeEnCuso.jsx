// import { useState } from "react";
// import { useData } from "../../../../context/DataContext";
// import EditableField from "../EditableField/EditableField";
// import { FaMapMarkerAlt, FaMoneyBillWave } from "react-icons/fa";
// import { ImSpinner2 } from "react-icons/im";
// import "./ViajeAsignado.css";
// import {
//   editarViajeRequest,
//   ingresarDestinoRequest,
//   ingresarImporteRequest,
// } from "../../../../api/data";
// import Loader from "../../../../componentes/Loader";
// import Mapa from "../../../Mapa/Mapa";
// import InfoViaje from "./InfoViaje";
// import IngresarDestino from "./IngresarDestino";
// import IngresarImporte from "./IngresarImporte";

// const ViajeEnCurso = () => {
//   // const { ViajeEnCurso, actualizarViajePendiente, agregarViajeCompletados, eliminarViajePendiente, loadingData } = useData();
//   const {
//     viajesOrdenados,
//     actualizarViajePendiente,
//     agregarViajeCompletados,
//     eliminarViajePendiente,
//     loadingData,
//     movil,
//   } = useData();

//   const [loadingField, setLoadingField] = useState("");

//   const principal = viajesOrdenados?.principal;
//   const cola = viajesOrdenados?.cola;

//   console.log("movil: ", movil);
//   console.log("viaje principal: ", principal);

//   const handleSaveDestino = async (newDestino, viajeId) => {
//     if (!newDestino.trim()) {
//       return;
//     }

//     setLoadingField(`destino-${viajeId}`);

//     console.log(newDestino);
//     try {
//       // const response = await editarViajeRequest(viajeId, newDestino);
//       // const response = await ingresarDestinoRequest(viajeId, principal.id_zona, newDestino, movil.id_movil);
//       //       const response =  await ingresarDestinoRequest({
//       //   viajeId: principal.id,
//       //   id_zona: principal.id_zona,
//       //   destino: newDestino,
//       //   movilId: movil.id_movil
//       // });
//       const response = await ingresarDestinoRequest(
//         principal.id,
//         principal.id_zona,
//         newDestino,
//         null,
//         movil.id_movil
//       );

//       // const response = await ingresarDestinoRequest(viajeId, principal.id_zona, newDestino, movil.id_movil);
//       console.log("response save destino", response);
//       if (response.success) {
//         // actualizarViajePendiente(viajeId, { destino: newDestino });
//         actualizarViajePendiente(viajeId, {
//           destino: newDestino,
//           id_zona_destino: response.data.id_zona_destino,
//         });
//         console.log(`Destino actualizado: ${newDestino} para viaje ${viajeId}`);
//       }
//       console.log(`Destino actualizado: ${newDestino} para viaje ${viajeId}`);
//     } catch (error) {
//       console.error("Error al guardar el destino:", error);
//     } finally {
//       setLoadingField("");
//     }
//   };

//   const handleSaveImporte = async (newImporte, viajeId) => {
//     if (!newImporte) return;

//     setLoadingField(`importe-${viajeId}`);

//     try {
//       const response = await ingresarImporteRequest(
//         viajeId,
//         newImporte,
//         movil.id_movil,
//         principal.id_zona,
//         principal.id_zona_destino
//       );
//       console.log(response.data);
//       if (response.success) {
//         actualizarViajePendiente(viajeId, { importe: newImporte });
//         agregarViajeCompletados(response.data);
//         console.log(`Importe actualizado: ${newImporte} para viaje ${viajeId}`);
//       }
//     } catch (error) {
//       console.error("Error al guardar el importe:", error);
//     } finally {
//       setLoadingField("");
//     }
//   };

//   if (loadingData) {
//     return <Loader />;
//   }

//   return (
//     <div className="viaje-asignado h-100 my-2 py-2 rounded text-center">
//       {/* <div className="admin-message bg-warning text-dark rounded p-3 my-3 shadow-sm">
//         <strong>📢 Mensaje del admin:</strong> Lorem ipsum dolor sit amet
//         consectetur adipisicing elit.
//       </div> */}
//       {principal ? (
//         <div
//           key={principal.id}
//           className="card bg-dark shadow-md mb-4 rounded-lg p-4"
//         >
//           {/* <div className="d-flex justify-content-between align-items-center">
//             <h3 className="text-lg text-warning">{principal.origen}</h3>
//             <p className="fw-bold text-light">
//               {principal.fecha_asignado_time}
//             </p>
//           </div> */}
//           <InfoViaje viaje={principal} />

//           <div className="card-inputs rounded text-light d-flex flex-column align-items-start gap-3 p-4">
//             {/* <div className="btn btn-dark fs-5 d-flex align-items-center gap-2">
//               <FaMapMarkerAlt size={20} color="#0d6efd" />
//               <EditableField
//                 value={principal.destino}
//                 placeholder="Ingresar Destino"
//                 onSave={(newValue) => handleSaveDestino(newValue, principal.id)}
//                 loading={loadingField === `destino-${principal.id}`}
//               />
//               {loadingField === `destino-${principal.id}` && (
//                 <ImSpinner2 className="spinner text-warning" size={20} />
//               )}
//             </div>

//             <div className="btn btn-dark fs-5 d-flex align-items-center gap-2">
//               <FaMoneyBillWave size={20} color="#28a745" />
//               <EditableField
//                 value={principal.importe}
//                 placeholder="Ingresar Importe"
//                 type="number"
//                 onSave={(newValue) => handleSaveImporte(newValue, principal.id)}
//                 loading={loadingField === `importe-${principal.id}`}
//               />
//               {loadingField === `importe-${principal.id}` && (
//                 <ImSpinner2 className="spinner text-success" size={20} />
//               )}
//             </div> */}
//             <IngresarDestino
//               destino={principal.destino}
//               viajeId={principal.id}
//               loading={loadingField === `destino-${principal.id}`}
//               onSave={handleSaveDestino}
//             />

//             <IngresarImporte
//               importe={principal.importe}
//               viajeId={principal.id}
//               loading={loadingField === `importe-${principal.id}`}
//               onSave={handleSaveImporte}
//             />
//           </div>
//           {principal.importe && (
//             <button
//               className="btn btn-success mt-3 w-100"
//               onClick={() => eliminarViajePendiente(principal.id)}
//             >
//               Finalizar
//             </button>
//           )}
//         </div>
//       ) : (
//         <p className="text-center text-gray-500">No tienes viajes asignados</p>
//       )}

//       {cola && (
//         <div className="card bg-dark shadow-md mb-4 rounded-lg p-4">
//           <h4 className="text-danger">Próximo viaje</h4>
//           <h3 className="text-lg text-warning">{cola.origen}</h3>
//           {/* <p className="fw-bold text-light">{cola.fecha_asignado_time}</p> */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ViajeEnCurso;

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
import Mapa from "../../../Mapa/Mapa";

const ViajeEnCurso = () => {
  const {
    viajesOrdenados,
    actualizarViajePendiente,
    agregarViajeCompletados,
    eliminarViajePendiente,
    loadingData,
    movil,
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
      }
    } catch (error) {
      console.error("Error al guardar el importe:", error);
    } finally {
      setLoadingField("");
    }
  };

  if (loadingData) return <Loader />;

  return (
    <div>
      {principal ? (
        <div
          key={principal.id}
       
        >
          <>
            <InfoViaje viaje={principal} />
         
            <div style={{height:"50vh"}}>
            <IngresarDestino
              destino={principal.destino}
              viajeId={principal.id}
              loading={loadingField === `destino-${principal.id}`}
              onSave={handleSaveDestino}
            />
            <Mapa/>
            </div>
            
            <IngresarImporte
              importe={principal.importe}
              viajeId={principal.id}
              loading={loadingField === `importe-${principal.id}`}
              onSave={handleSaveImporte}
            />
            {principal.importe && (
              <button
                className="btn btn-success mt-3 w-100"
                onClick={() => eliminarViajePendiente(principal.id)}
              >
                Finalizar
              </button>
            )}
          </>
        </div>
      ) : (
        <p className="text-center text-gray-500">No tienes viajes asignados</p>
      )}

      {cola && (
        <div className="card bg-dark shadow-md mb-4 rounded-lg p-4">
          <h4 className="text-danger">Próximo viaje</h4>
          <h3 className="text-lg text-warning">{cola.origen}</h3>
        </div>
      )}
    </div>
  );
};

export default ViajeEnCurso;
