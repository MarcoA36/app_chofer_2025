// import React, { createContext, useContext, useEffect, useState } from "react";
// import { useAuth } from "./AuthContext";
// import {
//   obtenerMovilAsignadoRequest,
//   obtenerViajesDeChoferRequest,
// } from "../api/data";

// const DataContext = createContext();

// export const useData = () => useContext(DataContext);

// export const DataProvider = ({ children }) => {
//   const { user } = useAuth();
//   const [isDisponible, setIsDisponible] = useState(false);
//   const [viajesCompletados, setViajesCompletados] = useState([]);
//   const [viajesPendientes, setViajesPendientes] = useState([]);
//   const [totalImportes, setTotalImportes] = useState(0);
//   const [movil, setMovil] = useState({});
//   const [loadingData, setLoadingData] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoadingData(true);
  
//       try {
//         const movilRes = await obtenerMovilAsignadoRequest(user.id_chofer);
//         setMovil(movilRes.data);
  
//         const viajesRes = await obtenerViajesDeChoferRequest(user.id_chofer);
//         setViajesPendientes(viajesRes.data.viajesPendientes);
//         setViajesCompletados(viajesRes.data.viajesCompletados);
//         setTotalImportes(viajesRes.data.total_recaudado);
//       } catch (error) {
//         console.error("Error al obtener datos:", error);
//       } finally {
//         setLoadingData(false);
//       }
//     };
  
//     // Solo ejecutamos fetchData si `user` y `user.id_chofer` están disponibles
//     if (user && user.id_chofer) {
//       fetchData();
//     }

//     if (!user) {
//       setMovil({});
//       setViajesPendientes([]);
//       setViajesCompletados([]);
//       setTotalImportes(0);
//     }
//   }, [user]);
  
// console.log("DataContext user:", user);
// console.log("DataContext movil:", movil);


// //REDUCERS
//   const actualizarUbicacion = (ubicacion) => {
//     setMovil((prevMovil) => ({
//       ...prevMovil,
//       ubicacion,
//     }));
//   };

//   const agregarViajePendiente = (nuevoViaje) => {
//     setViajesPendientes((prevViajes) => [nuevoViaje, ...prevViajes]);
//   };

//   const agregarViajeCompletados = (nuevoViaje) => {
//     setViajesCompletados((prevViajes) => [nuevoViaje, ...prevViajes]);
//     setTotalImportes((prevTotal) => prevTotal + Number(nuevoViaje.importe || 0));
//   };
  
//   const actualizarViajePendiente = (viajeId, datosActualizados) => {
//     setViajesPendientes((prevViajes) =>
//       prevViajes.map((viaje) =>
//         viaje.id === viajeId ? { ...viaje, ...datosActualizados } : viaje
//       )
//     );
//   };

//   const eliminarViajePendiente = (viajeId) => {
//   setViajesPendientes((prevViajes) =>
//     prevViajes.filter((viaje) => viaje.id !== viajeId)
//   );
// };

  
//   return (
//     <DataContext.Provider
//       value={{
//         viajesCompletados,
//         viajesPendientes, // ✅ Nuevo estado
//         totalImportes,
//         isDisponible,
//         setIsDisponible,
//         movil,
//         setMovil,
//         loadingData,
//         actualizarUbicacion,
//         agregarViajePendiente,
//         agregarViajeCompletados,
//         actualizarViajePendiente,
//         eliminarViajePendiente
//       }}
//     >
//       {children}
//     </DataContext.Provider>
//   );
// };









import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import {
  obtenerMovilAsignadoRequest,
  obtenerViajesDeChoferRequest,
} from "../api/data";

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  // Renombramos loading a authLoading para dejar claro que proviene de AuthContext.
  const { user, loading: authLoading } = useAuth();
  const [isDisponible, setIsDisponible] = useState(false);
  const [viajesCompletados, setViajesCompletados] = useState([]);
  const [viajesPendientes, setViajesPendientes] = useState([]);
  const [totalImportes, setTotalImportes] = useState(0);
  const [movil, setMovil] = useState({});
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    // Solo se ejecuta cuando AuthContext ya terminó de cargar (authLoading es false)
    if (!authLoading) {
      const fetchData = async () => {
        // setLoadingData(true);
        try {
          // Utilizamos la propiedad que corresponda del usuario, por ejemplo id_chofer o id
          const idChofer = user?.id_chofer || user?.id;
          if (user && idChofer) {
            const movilRes = await obtenerMovilAsignadoRequest(idChofer);
            setMovil(movilRes.data);

            const viajesRes = await obtenerViajesDeChoferRequest(idChofer);
            setViajesPendientes(viajesRes.data.viajesPendientes);
            setViajesCompletados(viajesRes.data.viajesCompletados);
            setTotalImportes(viajesRes.data.total_recaudado);
          } else {
            // Si no hay usuario, reseteamos los estados
            setMovil({});
            setViajesPendientes([]);
            setViajesCompletados([]);
            setTotalImportes(0);
          }
        } catch (error) {
          console.error("Error al obtener datos:", error);
        } 
        finally {
          setLoadingData(false);
        }
      };

      fetchData();
    }
  }, [user, authLoading]);

  console.log("DataContext user:", user);
  console.log("DataContext movil:", movil);

  // Reducers
  const actualizarUbicacion = (ubicacion) => {
    setMovil((prevMovil) => ({
      ...prevMovil,
      ubicacion,
    }));
  };

  const agregarViajePendiente = (nuevoViaje) => {
    setViajesPendientes((prevViajes) => [nuevoViaje, ...prevViajes]);
  };

  const agregarViajeCompletados = (nuevoViaje) => {
    setViajesCompletados((prevViajes) => [nuevoViaje, ...prevViajes]);
    setTotalImportes((prevTotal) => prevTotal + Number(nuevoViaje.importe || 0));
  };

  const actualizarViajePendiente = (viajeId, datosActualizados) => {
    setViajesPendientes((prevViajes) =>
      prevViajes.map((viaje) =>
        viaje.id === viajeId ? { ...viaje, ...datosActualizados } : viaje
      )
    );
  };

  const eliminarViajePendiente = (viajeId) => {
    setViajesPendientes((prevViajes) =>
      prevViajes.filter((viaje) => viaje.id !== viajeId)
    );
  };

  return (
    <DataContext.Provider
      value={{
        viajesCompletados,
        viajesPendientes,
        totalImportes,
        isDisponible,
        setIsDisponible,
        movil,
        setMovil,
        loadingData,
        actualizarUbicacion,
        agregarViajePendiente,
        agregarViajeCompletados,
        actualizarViajePendiente,
        eliminarViajePendiente,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
