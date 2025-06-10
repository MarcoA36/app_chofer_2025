import axios from "./axios";
import socket from "./socket";

export const obtenerEstadosMovilRequest = async () => {
  return axios.get("/obtener-estados-movil");
};

export const obtenerEstadosViajeRequest = async () => {
  return axios.get("/obtener-estados-viaje");
};



export const obtenerMovilAsignadoRequest = (id_chofer) =>
  axios.get(`/obtener-movil-asignado/${id_chofer}`);


export const obtenerViajesDeChoferRequest = (id_chofer) =>
  axios.get(`/obtener-viajes-chofer/${id_chofer}`);



  export const obtenerZonasRequest = () => {
    return axios.get("/obtener-zonas");
  };
  
  export const buscarZonaRequest = (origen) => {
    return axios.get(`/buscar-zona?origen=${encodeURIComponent(origen)}`);
  };
  

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

  export const ingresarDestinoRequest = (viajeId, id_zona, destino, id_zona_destino, movilId) => {
    console.log("socket.id (ingresarDestinoRequest): " + socket.id);
    return new Promise((resolve, reject) => {
      socket.emit(
        "chofer:ingresar-destino",
        { viajeId, id_zona, destino, id_zona_destino, movilId },
        (response) => {
          if (response.error) {
            console.error("Error al ingresar destino:", response.error);
            reject(response.error);
          } else {
            console.log("Destino ingresado con éxito:", response);
            resolve(response);
          }
        }
      );
    });
  };

  
// export const ingresarZonaDestinoRequest = (viajeId, zonaDestinoId, movilId) => {
//   console.log("socket.id (ingresarZonaDestinoRequest): " + socket.id);
//   console.log("viaje id: ", viajeId);
//   console.log("zona: ", zonaDestinoId);
//   console.log("movil: ", movilId);
//   return new Promise((resolve, reject) => {
//     socket.emit(
//       "chofer:ingresar-zona-destino",
//       { viajeId, zonaDestinoId, movilId },
//       (response) => {
//         if (response.error) {
//           console.error("Error al ingresar zona destino:", response.error);
//           reject(response.error);
//         } else {
//           console.log("Zona destino ingresada con éxito:", response);
//           resolve(response);
//         }
//       }
//     );
//   });
// };
export const ingresarZonaDestinoRequest = (viajeId, zonaDestinoId, movilId) => {
  console.log("socket.id (ingresarZonaDestinoRequest): " + socket.id);
  console.log("viaje id: ", viajeId);
  console.log("zona: ", zonaDestinoId);
  console.log("movil: ", movilId);

  return new Promise((resolve, reject) => {
    socket.emit(
      "chofer:ingresar-zona-destino",
      {
        viajeId, // ✔️ OK
        id_zona_destino: zonaDestinoId, // ❗ CORREGIDO
        movilId, // ✔️ OK
      },
      (response) => {
        if (response.error) {
          console.error("Error al ingresar zona destino:", response.error);
          reject(response.error);
        } else {
          console.log("Zona destino ingresada con éxito:", response);
          resolve(response);
        }
      }
    );
  });
};

  
export const ingresarImporteRequest = (viajeId, importe, id_movil, id_zona, id_zona_destino) => {
  return new Promise((resolve, reject) => {
    socket.emit("chofer:ingresar-importe", { viajeId, importe, id_movil, id_zona, id_zona_destino }, (response) => {
      if (response?.error) {
        console.error("Error en ingresar-importe:", response.error);
        reject(response.error);
      } else {
        resolve(response);
      }
    });
  });
};



  export const actualizarUbicacionRequest = (movilId, id_zona) => {
    return new Promise((resolve, reject) => {
      socket.emit(
        "chofer:actualizar-ubicacion",
        { movilId, id_zona },
        (response) => {
          if (response?.error) {
            console.error("Error en actualizar-ubicacion:", response.error);
            reject(response.error);
          } else {
            resolve(response);
          }
        }
      );
    });
  };
  

  export const respuestaSolicitudRequest = (viajeId, respuesta) => {
    return new Promise((resolve, reject) => {
      socket.emit(
        "chofer:respuesta-solicitud",
        { viajeId, respuesta }, // respuesta puede ser "aceptar" o "rechazar"
        (response) => {
          if (response?.error) {
            console.error("Error en respuesta-solicitud:", response.error);
            reject(response.error);
          } else {
            resolve(response);
          }
        }
      );
    });
  };
  