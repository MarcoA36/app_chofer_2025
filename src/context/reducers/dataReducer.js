// export const storeReducer = (state, action) => {
//     switch (action.type) {
//       case "SET_MOVIL":
//         return { ...state, movil: action.payload };
//       case "SET_VIAJES":
//         return { ...state, viajes: action.payload };
//       case "SET_TOTAL_IMPORTES":
//         return { ...state, totalImportes: action.payload };
//       case "SET_DISPONIBILIDAD":
//         return { ...state, isDisponible: action.payload };
//       case "SET_LOADING_DATA":
//         return { ...state, loadingData: action.payload };
//       case "UPDATE_MOVIL_UBICACION": 
//         return {
//           ...state,
//           movil: {
//             ...state.movil,
//             ubicacion: action.payload,
//           },
//         };
//       default:
//         return state;
//     }
//   };
  





export const initialData = {
    isDisponible: false,
    viajes: [],
    totalImportes: 0,
    movil: "Sin asignar",
    loadingData: true,
  };
  
  export const dataReducer = (state, action) => {
    switch (action.type) {
      case "SET_MOVIL":
        return { ...state, movil: action.payload };
      case "SET_VIAJES":
        return { ...state, viajes: action.payload };
      case "SET_TOTAL_IMPORTES":
        return { ...state, totalImportes: action.payload };
      case "SET_DISPONIBILIDAD":
        return { ...state, isDisponible: action.payload };
      case "SET_LOADING_DATA":
        return { ...state, loadingData: action.payload };
      case "UPDATE_MOVIL_UBICACION":
        return {
          ...state,
          movil: {
            ...state.movil,
            ubicacion: action.payload,
          },
        };
      default:
        return state;
    }
  };