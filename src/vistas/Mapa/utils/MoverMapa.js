import { useMap } from "react-leaflet";
import { useEffect } from "react";

export const MoverMapa = ({ ubicacion }) => {
  const map = useMap();

  useEffect(() => {
    if (ubicacion) {
      map.setView(ubicacion, map.getZoom());
    }
  }, [ubicacion, map]);

  return null;
};