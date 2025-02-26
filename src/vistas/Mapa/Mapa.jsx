import { useState, useEffect, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { useData } from "../../context/DataContext"; // Para acceder al contexto
import { actualizarUbicacionRequest } from "../../api/data";

const defaultIcon = new L.icon({
  iconUrl: icon,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: iconShadow,
  shadowSize: [41, 41],
});

const Mapa = () => {
  const { movil, actualizarUbicacion } = useData();
  console.log(movil);

  const olavarriaUbicacion = [-36.892, -60.322];

  // Estado local de la ubicación
  const [ubicacion, setUbicacion] = useState(
    movil?.ubicacion?.y && movil?.ubicacion?.x
      ? [movil.ubicacion.y, movil.ubicacion.x]
      : olavarriaUbicacion
  );

  // useEffect para escuchar cambios en 'movil'
  useEffect(() => {
    if (movil?.ubicacion?.y && movil?.ubicacion?.x) {
      setUbicacion([movil.ubicacion.y, movil.ubicacion.x]);
    }
  }, [movil]);

  const handleMarkerDragEnd = useCallback(
    async (event) => {
      const { lat, lng } = event.target.getLatLng();
      setUbicacion([lat, lng]); // Actualiza la ubicación local

      try {
        const response = await actualizarUbicacionRequest(movil.id_movil, lat, lng);
        console.log(response.data.ubicacion);
        actualizarUbicacion(response.data.ubicacion);
      } catch (error) {
        console.error("❌ Error al actualizar la ubicación del móvil:", error);
      }
    },
    [movil]
  );

  if (!ubicacion) return <p>Cargando mapa...</p>; // O un Loader

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer
        center={ubicacion}
        zoom={14}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={ubicacion}
          icon={defaultIcon}
          draggable={true}
          eventHandlers={{ dragend: handleMarkerDragEnd }}
        >
          <Tooltip direction="top" offset={[0, -25]} opacity={1} permanent>
            <strong style={{ fontSize: "20px" }}>
              {`${movil?.numero_movil}`}
            </strong>
          </Tooltip>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Mapa;
