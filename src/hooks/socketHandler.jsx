import { useEffect } from "react";
import socket from "../api/socket";
import { useData } from "../context/DataContext";

const useSocketHandler = () => {
  const { movil, actualizarUbicacion, agregarViajePendiente, agregarViajeCompletados, actualizarViajePendiente, eliminarViajePendiente } = useData();
  const movilId = movil?.id_movil;

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
      setTimeout(() => {
        eliminarViajePendiente(data.id);
      }, 3000);
    });
  
    socket.on("chofer:viaje-eliminado", (data) => {
      console.log("viaje eliminado recibido:", data);
      eliminarViajePendiente(data.id);
    });
    
    socket.on("chofer:ubicacion-actualizada", (movilActualizado) => {
      console.log("Ubicación actualizada desde admin:", movilActualizado.ubicacion);
      actualizarUbicacion(movilActualizado.ubicacion);
    });

    return () => {
      socket.off("viaje-asignado");
      socket.off("chofer:viaje-editado");
      socket.off("chofer:ubicacion-actualizada");
      console.log("Desconectado de Socket.IO");
    };
  }, [movilId]);
  
};

export default useSocketHandler;
