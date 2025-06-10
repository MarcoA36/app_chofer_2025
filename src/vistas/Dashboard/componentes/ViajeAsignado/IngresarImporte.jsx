// import { FaMoneyBillWave } from "react-icons/fa";
// import { ImSpinner2 } from "react-icons/im";
// import EditableField from "../EditableField/EditableField";

// const IngresarImporte = ({ importe, viajeId, loading, onSave }) => {
//   return (
//     <div className="btn btn-dark fs-5 d-flex align-items-center gap-2">
//       <FaMoneyBillWave size={20} color="#28a745" />
//       <EditableField
//         value={importe}
//         type="number"
//         placeholder="Ingresar Importe"
//         onSave={(newValue) => onSave(newValue, viajeId)}
//         loading={loading}
//       />
//       {loading && <ImSpinner2 className="spinner text-success" size={20} />}
//     </div>
//   );
// };

// export default IngresarImporte;

// import { FaMoneyBillWave } from "react-icons/fa";
// import { ImSpinner2 } from "react-icons/im";
// import EditableField from "../EditableField/EditableField";

// const IngresarImporte = ({ importe, viajeId, loading, onSave, onFinalizar }) => {
//   return (
//     <div className="d-flex flex-column gap-2 text-light mt-2 bg-primary p-3 rounded-3">
//         Al finalizar el viaje ingrese el importe
//       <div className="btn btn-dark fs-5 d-flex align-items-center gap-2">
//         <FaMoneyBillWave size={20} color="#28a745" />
//         <EditableField
//           value={importe}
//           type="number"
//           placeholder="Ingresar Importe"
//           onSave={(newValue) => onSave(newValue, viajeId)}
//           loading={loading}
//         />
//         {loading && <ImSpinner2 className="spinner text-success" size={20} />}
//       </div>

//       {importe && (
//         <button
//           className="btn btn-success w-100"
//           onClick={() => onFinalizar(viajeId)}
//         >
//           Finalizar
//         </button>
//       )}
//     </div>
//   );
// };

// export default IngresarImporte;

import { FaMoneyBillWave } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import EditableField from "../EditableField/EditableField";

const IngresarImporte = ({
  importe,
  viajeId,
  loading,
  onSave,
  onFinalizar,
}) => {
  return (
    <div className="card-box">
      {/* {!importe && (
        <p
          className="mb-3 fw-medium bg-warning p-2 rounded border border-warning"
          style={{ fontSize: "0.95rem", color: "#444" }}
        >
          <strong>INGRESE EL IMPORTE</strong> al finalizar el viaje.
        </p>
      )} */}
      {!importe ? (
        <p
          className="mb-3 fw-medium bg-warning p-2 rounded border border-warning"
          style={{ fontSize: "0.95rem", color: "#444" }}
        >
          <strong>INGRESE EL IMPORTE</strong> al finalizar el viaje.
        </p>
      ) : (
        <p
          className="mb-3 fw-medium bg-success text-light p-2 rounded border"
          style={{ fontSize: "0.95rem" }}
        >
          <strong>INGRESO EL IMPORTE </strong>
        </p>
      )}

      <div className="d-flex align-items-center gap-3 bg-white border rounded p-2 m-2">
        <FaMoneyBillWave size={22} color="#198754" />
        <EditableField
          value={importe}
          type="number"
          placeholder="Ingresar Importe"
          onSave={(newValue) => onSave(newValue, viajeId)}
          loading={loading}
        />
        {loading && <ImSpinner2 className="spinner text-success" size={20} />}
      </div>

      {importe && (
        <button
          className="btn btn-success w-100 fw-bold"
          onClick={() => onFinalizar(viajeId)}
        >
          Finalizar viaje
        </button>
      )}
    </div>
  );
};

export default IngresarImporte;
