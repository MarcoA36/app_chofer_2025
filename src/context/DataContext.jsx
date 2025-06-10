import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import {
  obtenerEstadosMovilRequest,
  obtenerEstadosViajeRequest,
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
  const [estadosMovil, setEstadosMovil] = useState([]);
  const [estadosViaje, setEstadosViaje] = useState([]);
  // const [solicitudConfirmacion, setSolicitudConfirmacion] = useState(null);

  useEffect(() => {
    // Solo se ejecuta cuando AuthContext ya terminó de cargar (authLoading es false)
    if (!authLoading) {
      const fetchData = async () => {
        // setLoadingData(true);
        try {
          const responseEstadosMovil = await obtenerEstadosMovilRequest();
          setEstadosMovil(responseEstadosMovil);
          const responseEstadosViaje = await obtenerEstadosViajeRequest();
          setEstadosViaje(responseEstadosViaje);
          console.log("estados: ", responseEstadosMovil.data);
          console.log("estados viaje: ", responseEstadosViaje.data);
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
        } finally {
          setLoadingData(false);
        }
      };

      fetchData();
    }
  }, [user, authLoading]);

  console.log("DataContext user:", user);
  console.log("DataContext movil:", movil);
  const viajesOrdenados = (() => {
    if (!viajesPendientes || viajesPendientes.length === 0) return {};

    // Ordenar por fecha_asignacion ascendente
    const ordenados = [...viajesPendientes].sort(
      (a, b) => new Date(a.fecha_asignacion) - new Date(b.fecha_asignacion)
    );

    return {
      principal: ordenados[0],
      cola: ordenados[1] || null,
    };
  })();

  console.log("viajes ordenados: ", viajesOrdenados);
  // Reducers
  const actualizarUbicacion = (id_zona) => {
    setMovil((prevMovil) => ({
      ...prevMovil,
      id_zona,
    }));
  };

  const agregarViajePendiente = (nuevoViaje) => {
    setViajesPendientes((prevViajes) => [nuevoViaje, ...prevViajes]);
  };

  const agregarViajeCompletados = (nuevoViaje) => {
    setViajesCompletados((prevViajes) => [nuevoViaje, ...prevViajes]);
    setTotalImportes(
      (prevTotal) => prevTotal + Number(nuevoViaje.importe || 0)
    );
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
        viajesOrdenados,
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
        estadosMovil,
        estadosViaje,
        // solicitudConfirmacion,
        // setSolicitudConfirmacion,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
