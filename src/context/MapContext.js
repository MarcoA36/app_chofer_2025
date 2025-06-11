import React, { createContext, useContext, useRef, useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

const MapContext = createContext();

export const MapProvider = ({ children, ubicacionInicial }) => {
  const [map, setMap] = useState(null);

  return (
    <MapContext.Provider value={{ map }}>
      <div style={{ height: "100vh", width: "100vw", position: "fixed", top: 0, left: 0, zIndex: 0 }}>
        <MapContainer
          center={ubicacionInicial}
          zoom={14}
          zoomControl={false}
          whenCreated={setMap}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            detectRetina={true}
            crossOrigin={true}
          />
        </MapContainer>
      </div>

      {/* Tu app sigue renderizándose por arriba del mapa */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {children}
      </div>
    </MapContext.Provider>
  );
};

export const useMap = () => useContext(MapContext);
