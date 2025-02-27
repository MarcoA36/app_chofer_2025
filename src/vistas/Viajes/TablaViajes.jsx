// import React from "react";
// import { useData } from "../../context/DataContext";
// import { Card, Row, Col } from "react-bootstrap";
// import "./TablaViajes.css"
// const ListaViajes = () => {
//   const { viajesCompletados } = useData();
//   const viajesOrdenados = [...viajesCompletados].sort(
//     (a, b) => new Date(b.fecha_completado) - new Date(a.fecha_completado)
//   );

//   return (
//     <div className="lista_viajes m-3">
//       {viajesOrdenados.map((viaje, index) => (
//         <Card
//           key={index}
//           className="mb-2 p-2 py-0 shadow-sm bg-dark text-light border border-secondary"
//         >
//           <Row className="align-items-center h-100">
//             <Col xs={2} className="d-flex flex-column text-center justify-content-center">
//               <p className="fw-bold fs-2 text-secondary">
//                 {viajesOrdenados.length - index}
//               </p>
//             </Col>

//             <Col xs={8} className="d-flex flex-column gap-1 p-1 justify-content-center">
//               <div className="d-flex justify-content-between align-items-center gap-2 text-center p-0 w-100">
//                 <p className="fw-bold text-warning">{viaje.origen}</p>
//                 <p className="fw-bold text-success">{viaje.destino || "?"}</p>
//               </div>
//               <div className="d-flex justify-content-between align-items-center text-center p-0 w-100">
//                 <p className="fw-bold text-warning">
//                   {viaje.fecha_asignado_time}
//                 </p>
//                 <p className="fw-bold text-success">{viaje.fecha_completado_time}</p>
//               </div>
//             </Col>
            
//             <Col xs={2} className="d-flex flex-column text-center justify-content-center">
//               <p className="fw-bold">${viaje.importe}</p>
//             </Col>
//           </Row>
//         </Card>
//       ))}
//     </div>
//   );
// };

// export default ListaViajes;











import React from "react";
import { useData } from "../../context/DataContext";
import { Card, Row, Col } from "react-bootstrap";
import "./TablaViajes.css"
import { FaInfoCircle, FaRegFileAlt } from "react-icons/fa";
const ListaViajes = () => {
  const { viajesCompletados } = useData();
  const viajesOrdenados = [...viajesCompletados].sort(
    (a, b) => new Date(b.fecha_completado) - new Date(a.fecha_completado)
  );

  return (
    <div className="lista_viajes m-3">
      {viajesOrdenados.map((viaje, index) => (
        <Card
          key={index}
          className="mb-2 p-2 py-0 shadow-sm bg-dark text-light border border-secondary"
        >
          <Row className="align-items-center h-100">
            <Col xs={2} className="d-flex flex-column text-center justify-content-center">
              <p className="fw-bold fs-2 text-secondary">
                {viajesOrdenados.length - index}
              </p>
            </Col>

            <Col xs={3} className="d-flex flex-column gap-1 p-1 justify-content-center align-items-center text-center">
                <p className="fw-bold text-warning">{viaje.origen}</p>
                {/* <p className="fw-bold text-success">{viaje.destino || "?"}</p> */}
            </Col>


            <Col xs={3} className="d-flex flex-column gap-1 p-1 justify-content-center align-items-center">
                <p className="fw-bold text-warning">
                  {viaje.fecha_asignado_time}
                </p>
                {/* <p className="fw-bold text-success">{viaje.fecha_completado_time}</p> */}
            </Col>
            
            <Col xs={4} className="d-flex flex-column text-center justify-content-center">
              <p className="fw-bold">${viaje.importe}</p>
            </Col>
            {/* <Col xs={1} className="d-flex justify-content-center">
            <FaRegFileAlt className="text-secondary" />
            </Col> */}
          </Row>
        </Card>
      ))}
    </div>
  );
};

export default ListaViajes;
