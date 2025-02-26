// import { fetchMovil } from "./fetchMovil";
// import { fetchViajes } from "./fetchViajes";

// export const cargarData = async (id_chofer, dispatch) => {
//   try {
//     dispatch({ type: "SET_LOADING_DATA", payload: true });

//     // ⏳ Primero obtenemos el móvil
//     await fetchMovil(id_chofer, dispatch);

//     // ✅ Una vez obtenido el móvil, obtenemos los viajes
//     await fetchViajes(id_chofer, dispatch);
//   } catch (error) {
//     console.error("Error al obtener datos iniciales:", error);
//   } finally {
//     dispatch({ type: "SET_LOADING_DATA", payload: false });
//   }
// };


import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import { fetchMovil } from "./fetchMovil";
import { fetchViajes } from "./fetchViajes";

export const cargarData = () => {
  const { user } = useAuth();
  const [, dispatch] = useData();

  const cargarData = async () => {
    if (!user?.id_chofer) return;

    try {
      dispatch({ type: "SET_LOADING_DATA", payload: true });
      await fetchMovil(user.id_chofer, dispatch); 
      await fetchViajes(user.id_chofer, dispatch); 
    } catch (error) {
      console.error("Error al obtener datos iniciales:", error);
    } finally {
      dispatch({ type: "SET_LOADING_DATA", payload: false });
    }
  };

  return { cargarData };
};
