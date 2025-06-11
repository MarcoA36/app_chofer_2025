import { useEffect } from "react";
import { useMap } from "react-leaflet";

const FixBlurOnLoad = () => {
  const map = useMap();

  useEffect(() => {
    const currentZoom = map.getZoom();

    // Hacemos el "baile" de zoom
    map.setZoom(currentZoom - 1);

    // Después de un pequeño delay lo volvemos al zoom original
    setTimeout(() => {
      map.setZoom(currentZoom);
    }, 900); // 200ms funciona bien, lo podés ajustar

  }, [map]);

  return null;
};

export default FixBlurOnLoad;
