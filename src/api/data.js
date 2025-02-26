import axios from "./axios";
import socket from "./socket";

export const obtenerMovilAsignadoRequest = (id_chofer) =>
  axios.get(`/obtener-movil-asignado/${id_chofer}`);


export const obtenerViajesDeChoferRequest = (id_chofer) =>
  axios.get(`/obtener-viajes-chofer/${id_chofer}`);



  export const editarViajeRequest = (viajeId, destino) => {
    return new Promise((resolve, reject) => {
      socket.emit("chofer:editar-viaje", { viajeId, destino }, (response) => {
        if (response?.error) {
          console.error("Error en editar-viaje:", response.error);
          reject(response.error);
        } else {
          resolve(response);
        }
      });
    });
  };
  
  export const ingresarImporteRequest = (viajeId, importe) => {
    return new Promise((resolve, reject) => {
      socket.emit("chofer:ingresar-importe", { viajeId, importe }, (response) => {
        if (response?.error) {
          console.error("Error en ingresar-importe:", response.error);
          reject(response.error);
        } else {
          resolve(response);
        }
      });
    });
  };
  



  export const actualizarUbicacionRequest = (movilId, latitud, longitud) => {
    console.log("actualizar ubicacion request ")
    return new Promise((resolve, reject) => {
      socket.emit(
        "chofer:actualizar-ubicacion",
        { movilId, latitud, longitud },
        (response) => {
          if (response?.error) {
            console.error("Error en actualizar-ubicacion:", response.error);
            reject(response.error);
          } else {
            resolve(response);
            console.log(response)
          }
        }
      );
    });
  };