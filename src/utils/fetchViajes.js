import { obtenerViajesDeChoferRequest } from "../api/data";

export const fetchViajes = async (id_chofer, dispatch) => {
    try {
      dispatch({ type: "SET_LOADING_DATA", payload: true });
      const viajesRes = await obtenerViajesDeChoferRequest(id_chofer);
      dispatch({ type: "SET_VIAJES", payload: viajesRes.data.viajes });
      dispatch({
        type: "SET_TOTAL_IMPORTES",
        payload: viajesRes.data.total_recaudado,
      });
    } catch (error) {
      console.error("Error al obtener viajes:", error);
    } finally {
      dispatch({ type: "SET_LOADING_DATA", payload: false });
    }
  };