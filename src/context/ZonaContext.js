// context/ZonaContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { obtenerZonasRequest } from "../api/data";
import { useData } from "./DataContext";

const ZonaContext = createContext();

export const useZona = () => useContext(ZonaContext);

export const ZonaProvider = ({ children }) => {
  const { movil } = useData();
  const [zonas, setZonas] = useState([]);
  const [zonaActual, setZonaActual] = useState(null);
  const [zonaSeleccionadaTemp, setZonaSeleccionadaTemp] = useState(null);
  const [loadingZonas, setLoadingZonas] = useState(true);
  const olavarriaUbicacion = [-36.892, -60.322];

  useEffect(() => {
    const fetchZonas = async () => {
      try {
        const res = await obtenerZonasRequest();
        setZonas(res.data);
      } catch (error) {
        console.error("Error al cargar zonas:", error);
      }finally {
        setLoadingZonas(false); 
      }
    };
    fetchZonas();
  }, []);

  useEffect(() => {
    if (zonas.length && movil?.id_zona) {
      const zona = zonas.find(
        (z) => String(z.id_zona) === String(movil.id_zona)
      );
      if (zona) {
        setZonaActual(zona);
      } else {
        console.warn("Zona no encontrada, usando Olavarría");
        setZonaActual({
          nombre: "Desconocida",
          latitud: olavarriaUbicacion[0],
          longitud: olavarriaUbicacion[1],
        });
      }
    }
  }, [zonas, movil?.id_zona]);

  return (
    <ZonaContext.Provider
      value={{
        zonas,
        zonaActual,
        setZonaActual,
        zonaSeleccionadaTemp,
        setZonaSeleccionadaTemp,
        loadingZonas
      }}
    >
      {children}
    </ZonaContext.Provider>
  );
};
