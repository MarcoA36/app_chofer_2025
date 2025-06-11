import { useState, useEffect, useCallback, useMemo } from "react";
import { MapContainer, TileLayer, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useData } from "../../context/DataContext";
import {
  actualizarUbicacionRequest,
  buscarZonaRequest,
  ingresarDestinoRequest,
  ingresarZonaDestinoRequest,
  obtenerZonasRequest,
} from "../../api/data";
import ZonaSelector from "../../componentes/ZonaSelector";
import { MoverMapa } from "./utils/MoverMapa";
import BuscarZona from "../../componentes/BuscarZona";
// import InfoViajes from "../../componentes/InfoViajes";
import { detectarZonaPorRadio } from "./utils/detectarZona";
import { ClickDetector } from "./utils/ClickDetector";
import InfoUbicacion from "../../componentes/InfoUbicacion";
import { useZona } from "../../context/ZonaContext";
import { useNavigate } from "react-router-dom";
import InfoEstadoMovil from "./componentes/InfoEstadoMovil";

const Mapa = () => {
  const {
    movil,
    actualizarUbicacion,
    actualizarViajePendiente,
    viajesPendientes,
    estadosMovil,
    viajesOrdenados,
  } = useData();
  const [ubicacion, setUbicacion] = useState(null);
  const {
    zonas,
    zonaActual,
    setZonaActual,
    zonaSeleccionadaTemp,
    setZonaSeleccionadaTemp,
  } = useZona();
  const navigate = useNavigate();

  const [loadingZona, setLoadingZona] = useState(false);
  const olavarriaUbicacion = [-36.892, -60.322];
  const [zonaSeleccionadaId, setZonaSeleccionadaId] = useState(
    movil?.id_zona || null
  );
  const { principal, cola } = viajesOrdenados || {};
  const [mostrarZonaPanel, setMostrarZonaPanel] = useState(false);
  const [mostrarFormularioZona, setMostrarFormularioZona] = useState(false);
  const handleTogglePanel = () => setMostrarZonaPanel(!mostrarZonaPanel);
  const esAsignarDestino = Boolean(principal);
  const esEditarUbicacion = !principal;
  console.log("VIAJES PENDIENTES", viajesPendientes);

  useEffect(() => {
    if (zonaActual) {
      setUbicacion([zonaActual.latitud, zonaActual.longitud]);
    }
    setZonaSeleccionadaTemp(null);
  }, [zonaActual]);

  // useEffect(() => {
  //   setZonaSeleccionadaId(zonaActual?.id_zona || movil?.id_zona || null);
  // }, [zonaActual?.id_zona, movil?.id_zona]);

  const handleBuscarDireccion = async (direccion) => {
    try {
      setLoadingZona(true);
      const response = await buscarZonaRequest(direccion);
      const { id_zona } = response.data;

      if (!id_zona) {
        console.warn("No se encontró una zona para esa dirección.");
        return;
      }

      // Actualizás solo el selector, no el backend
      // setZonaSeleccionadaId(id_zona);

      // También opcionalmente actualizás zonaActual para el círculo y mapa
      const nuevaZona = zonas.find((z) => z.id_zona === id_zona);
      // if (nuevaZona) setZonaActual(nuevaZona);
      if (nuevaZona) setZonaSeleccionadaTemp(nuevaZona);
    } catch (error) {
      console.error("❌ Error al obtener la zona desde la dirección:", error);
    } finally {
      setLoadingZona(false);
    }
  };

  const handleGuardarZona = async (zonaId) => {
    try {
      setLoadingZona(true);

      if (principal) {
        const response = await ingresarDestinoRequest(
          principal.id,
          principal.id_zona,
          null,
          zonaId,
          movil.id_movil
        );

        console.log("response save destino", response);
        if (response.success) {
          // actualizarViajePendiente(viajeId, { destino: newDestino });
          actualizarViajePendiente(principal.id, {
            destino: response.data.destino,
            id_zona_destino: response.data.id_zona_destino,
          });
          // navigate("/");
        }

        console.log("Zona de destino ingresada", response.data);
      } else {
        // Si no hay viaje, actualizar ubicación del móvil
        await actualizarUbicacionRequest(movil.id_movil, zonaId);
        actualizarUbicacion(zonaId);

        const nuevaZona = zonas.find((z) => z.id_zona === zonaId);
        if (nuevaZona) setZonaActual(nuevaZona);
      }

      setZonaSeleccionadaTemp(null);
    } catch (error) {
      console.error("❌ Error al guardar la zona:", error);
    } finally {
      setLoadingZona(false);
    }
  };

  // const handleZonaSeleccionada = (zona) => {
  //   setZonaSeleccionadaTemp(zona); // zona temporal que aún no se guardó
  //   if (zona.lat && zona.lng) setUbicacion([zona.lat, zona.lng]); // mover el mapa
  // };

  const handleClick = (lat, lng) => {
    const zonaDetectada = detectarZonaPorRadio(lat, lng, zonas);
    if (zonaDetectada) {
      console.log("✅ Estás dentro de la zona:", zonaDetectada.nombre);
      setZonaSeleccionadaTemp(zonaDetectada);
      setUbicacion([zonaDetectada.latitud, zonaDetectada.longitud]);
    } else {
      console.log("❌ No estás en ninguna zona");
      setZonaSeleccionadaTemp(null);
    }
  };
  useEffect(() => {
    if (zonaSeleccionadaTemp) {
      setUbicacion([
        zonaSeleccionadaTemp.latitud,
        zonaSeleccionadaTemp.longitud,
      ]);
    }
  }, [zonaSeleccionadaTemp]);

  useEffect(() => {
    if (movil?.id_zona && zonas.length > 0) {
      const zona = zonas.find(
        (z) => String(z.id_zona) === String(movil.id_zona)
      );
      if (zona) {
        setZonaActual(zona);
        setUbicacion([zona.latitud, zona.longitud]);
      }
    }
  }, [movil?.id_zona, zonas]);

  const hayCambiosZona = useMemo(() => {
    if (!zonaSeleccionadaTemp?.id_zona) return false;

    if (esAsignarDestino) {
      return zonaSeleccionadaTemp.id_zona !== principal?.id_zona_destino;
    }

    if (esEditarUbicacion) {
      return zonaSeleccionadaTemp.id_zona !== zonaActual?.id_zona;
    }

    return false;
  }, [zonaSeleccionadaTemp, principal, zonaActual]);

  if (!ubicacion) return <p>Cargando mapa...</p>;

  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      <MapContainer
        center={ubicacion}
        zoom={14}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
        <MoverMapa ubicacion={ubicacion} />
        <ClickDetector onClick={handleClick} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* {zonaActual && !zonaSeleccionadaTemp && (
          <Circle
            center={[zonaActual.latitud, zonaActual.longitud]}
            radius={zonaActual.radio}
            pathOptions={{
              color: "blue",
              stroke: false,
              fillColor: "blue",
              fillOpacity: 0.2,
            }}
          />
        )} */}
        {/* {zonaActual && !zonaSeleccionadaTemp && !principal && (
          <Circle
            center={[zonaActual.latitud, zonaActual.longitud]}
            radius={zonaActual.radio}
            pathOptions={{
              color: "blue",
              stroke: false,
              fillColor: "blue",
              fillOpacity: 0.2,
            }}
          />
        )} */}

        {!principal && !zonaSeleccionadaTemp && zonaActual && (
          <Circle
            center={[zonaActual.latitud, zonaActual.longitud]}
            radius={zonaActual.radio}
            pathOptions={{
              color: "blue",
              stroke: false,
              fillColor: "blue",
              fillOpacity: 0.2,
            }}
          />
        )}

        {principal && (
          // && !zonaSeleccionadaTemp
          <>
            {zonas.some((z) => z.id_zona === principal.id_zona) && (
              <Circle
                center={[
                  zonas.find((z) => z.id_zona === principal.id_zona).latitud,
                  zonas.find((z) => z.id_zona === principal.id_zona).longitud,
                ]}
                radius={
                  zonas.find((z) => z.id_zona === principal.id_zona).radio
                }
                pathOptions={{
                  color: "blue",
                  stroke: false,
                  fillColor: "orange",
                  fillOpacity: 0.2,
                }}
              />
            )}
            {principal.id_zona_destino &&
              zonas.some((z) => z.id_zona === principal.id_zona_destino) && (
                <Circle
                  center={[
                    zonas.find((z) => z.id_zona === principal.id_zona_destino)
                      .latitud,
                    zonas.find((z) => z.id_zona === principal.id_zona_destino)
                      .longitud,
                  ]}
                  radius={
                    zonas.find((z) => z.id_zona === principal.id_zona_destino)
                      .radio
                  }
                  pathOptions={{
                    color: "green",
                    stroke: false,
                    fillColor: "blue",
                    fillOpacity: 0.2,
                  }}
                />
              )}
          </>
        )}

        {zonaSeleccionadaTemp && (
          <Circle
            center={[
              zonaSeleccionadaTemp.latitud,
              zonaSeleccionadaTemp.longitud,
            ]}
            radius={zonaSeleccionadaTemp.radio}
            pathOptions={{
              color: "red",
              stroke: false,
              fillColor: "red",
              fillOpacity: 0.2,
            }}
          />
        )}
      </MapContainer>

      <div
        className="zona-panel bg-dark"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          // background: "rgba(255, 255, 255, 0.9)",
          padding: "1rem",
          borderTop: "1px solid #ccc",
          zIndex: 1000,
        }}
      >
        {hayCambiosZona && (
          <div
            className={`alert ${
              principal ? "alert-primary" : "alert-success"
            } text-center fw-bold py-2 mb-2`}
          >
            {principal ? "Nuevo destino" : "Nueva zona libre"}
          </div>
        )}
        <BuscarZona onBuscar={handleBuscarDireccion} loading={loadingZona} />
        <ZonaSelector
          zonas={zonas}
          zonaSeleccionadaId={zonaSeleccionadaTemp?.id_zona ?? null}
          onSeleccionarZona={(id) => {
            const nuevaZona = zonas.find((z) => z.id_zona === id);
            if (nuevaZona) setZonaSeleccionadaTemp(nuevaZona);
          }}
          loading={loadingZona}
        />

        {hayCambiosZona && (
          <div className="mt-2 d-flex gap-2">
            <button
              className="btn btn-sm btn-success flex-grow-1"
              // onClick={() => handleGuardarZona(zonaSeleccionadaTemp.id_zona)}
              onClick={() =>
                handleGuardarZona(
                  zonaSeleccionadaTemp.id_zona,
                  zonaSeleccionadaTemp.nombre
                )
              }
              disabled={loadingZona}
            >
              {loadingZona ? "Guardando..." : "Guardar cambios"}
            </button>
            <button
              className="btn btn-sm btn-secondary flex-grow-1"
              onClick={() => {
                // setZonaSeleccionadaId(zonaActual?.id_zona || null);
                setZonaSeleccionadaTemp(null);
              }}
              disabled={loadingZona}
            >
              Cancelar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mapa;
