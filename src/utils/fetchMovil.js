import { obtenerMovilAsignadoRequest } from "../api/data";

export const fetchMovil = async (id_chofer, dispatch) => {
    try {
      dispatch({ type: "SET_LOADING_DATA", payload: true });
      const movilRes = await obtenerMovilAsignadoRequest(id_chofer);
      dispatch({ type: "SET_MOVIL", payload: movilRes.data });
    } catch (error) {
      console.error("Error al obtener el móvil:", error);
    } finally {
      dispatch({ type: "SET_LOADING_DATA", payload: false });
    }
  };