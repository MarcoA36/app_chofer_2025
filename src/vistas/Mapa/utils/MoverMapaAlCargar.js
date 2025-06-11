import { useEffect } from "react";
import { useMap } from "react-leaflet";

const MoverMapaAlCargar = () => {
  const map = useMap();

  useEffect(() => {
    const doZoomFix = () => {
      const currentZoom = map.getZoom();
      map.setZoom(currentZoom + 0.0001); // Pequeño movimiento
    };

    // Espera apenas 300ms después de renderizado
    setTimeout(doZoomFix, 300);
  }, [map]);

  return null;
};

export default MoverMapaAlCargar;
