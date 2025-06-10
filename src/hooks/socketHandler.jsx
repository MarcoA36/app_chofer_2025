import { useEffect } from "react";
import socket from "../api/socket";
import { useData } from "../context/DataContext";
// import { useZona } from "../context/ZonaContext";

const useSocketHandler = () => {
  const {
    movil,
    actualizarUbicacion,
    agregarViajePendiente,
    agregarViajeCompletados,
    actualizarViajePendiente,
    eliminarViajePendiente,
    setSolicitudConfirmacion,
  } = useData();
  const movilId = movil?.id_movil;
  // const { setZonaActual } = useZona();
  useEffect(() => {
    if (!movilId) {
      return;
    }
    // Conectar y emitir movilId cuando movilId esté disponible
    socket.connect();
    console.log("Conectado al servidor de Socket.IO");
    console.log("socket.id: " + socket.id);

    socket.emit("send-movil-id", movilId);

    socket.on("viaje-asignado", (data) => {
      console.log("viaje asignado:", data);
      agregarViajePendiente(data);
    });

    socket.on("chofer:viaje-editado", (data) => {
      console.log("viaje editado:", data);
      actualizarViajePendiente(data.id, data);
    });

    socket.on("chofer:importe-ingresado", (data) => {
      console.log("importe ingresado:", data);
      actualizarViajePendiente(data.id, data);
      agregarViajeCompletados(data);
      actualizarUbicacion(data.id_zona_movil);
      setTimeout(() => {
        eliminarViajePendiente(data.id);
      }, 3000);
    });

    socket.on("chofer:viaje-eliminado", (data) => {
      console.log("viaje eliminado recibido:", data);
      eliminarViajePendiente(data.id);
    });

    socket.on("chofer:ubicacion-actualizada", (movilActualizado) => {
      console.log(
        "Ubicación actualizada desde admin a la zona:",
        movilActualizado.id_zona
      );
      actualizarUbicacion(movilActualizado.id_zona);
    });

    // socket.on(
    //   "solicitud-de-confirmacion",
    //   ({ viajeId, origen, movil, chofer }) => {

    //     console.log("Solicitud recibida, mostrando confirmación");
    //     alert("¡Nuevo viaje desde " + origen + "!");
    //     const aceptado = true; // simulamos aceptar para test

    //     socket.emit("respuesta-confirmacion", {
    //       aceptado,
    //       viajeId,
    //       origen,
    //       movil,
    //       chofer,
    //     });
    //   }
    // );

    socket.on("solicitud-de-confirmacion", (data) => {
      console.log("Solicitud recibida, guardando estado para confirmación");

      setSolicitudConfirmacion(data); // ahora la UI puede decidir cuándo y cómo mostrarlo
    });

    return () => {
      socket.off("viaje-asignado");
      socket.off("chofer:viaje-editado");
      socket.off("chofer:importe-ingresado");
      socket.off("chofer:viaje-eliminado");
      socket.off("chofer:ubicacion-actualizada");
      socket.off("solicitud-de-confirmacion");
      console.log("Desconectado de Socket.IO");
    };
  }, [movilId]);
};

export default useSocketHandler;
