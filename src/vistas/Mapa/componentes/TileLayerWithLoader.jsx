import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Circle, useMap } from "react-leaflet";

export const TileLayerWithLoader = ({ onTilesLoaded }) => {
  const map = useMap();

  useEffect(() => {
    let tilesLoading = 0;
    
    const handleTileLoadStart = () => {
      tilesLoading++;
    };

    const handleTileLoad = () => {
      tilesLoading--;
      if (tilesLoading === 0) {
        onTilesLoaded();
      }
    };

    map.on("tileloadstart", handleTileLoadStart);
    map.on("tileload", handleTileLoad);

    return () => {
      map.off("tileloadstart", handleTileLoadStart);
      map.off("tileload", handleTileLoad);
    };
  }, [map, onTilesLoaded]);

  return (
    <TileLayer
      attribution='&copy; OpenStreetMap contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
  );
};
