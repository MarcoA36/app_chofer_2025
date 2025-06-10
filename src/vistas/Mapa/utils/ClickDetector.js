import { useMapEvent } from "react-leaflet";

export const ClickDetector = ({ onClick }) => {
  useMapEvent("click", (e) => {
    const { lat, lng } = e.latlng;
    onClick(lat, lng);
  });

  return null;
};
