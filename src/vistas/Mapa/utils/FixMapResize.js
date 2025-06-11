import { useMap } from "react-leaflet";
import { useEffect } from "react";

export const FixMapResize = () => {
  const map = useMap();

  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 100); // pequeño delay para asegurarte que ya está montado completamente
  }, [map]);

  return null;
};
