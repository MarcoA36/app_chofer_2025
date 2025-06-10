// import { useData } from "../context/DataContext";
// import { useZona } from "../context/ZonaContext";

// const InfoUbicacion = () => {
//   const { zonaActual } = useZona();
//   if (!zonaActual) return null;

//   return (
//     <div className="info-ubicacion w-100 rounded bg-success py-3 mb-2 text-center">
//       <p>
//         Libre en zona <strong>{zonaActual.nombre}</strong>
//       </p>
//     </div>
//   );
// };
// export default InfoUbicacion;



import { Link } from "react-router-dom";
import { useZona } from "../context/ZonaContext";
const InfoUbicacion = () => {
  const { zonaActual } = useZona();
  if (!zonaActual) return null;

  return (
    <Link to="/mapa" className="text-decoration-none">
      <div className="info-ubicacion w-100 rounded bg-success py-3 mb-2 text-center text-white">
        <p className="mb-0">
          Libre en zona <strong>{zonaActual.nombre}</strong>
        </p>
      </div>
    </Link>
  );
};

export default InfoUbicacion;
