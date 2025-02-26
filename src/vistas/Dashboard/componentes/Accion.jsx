import React from "react";
import { useData } from "../../../context/DataContext";

const Accion = () => {
  const { isDisponible } = useData();

  return (
    <div className="accion">
      <button className="rounded text-center" disabled={!isDisponible}>
        Ocupar
      </button>
    </div>
  );
};

export default Accion;
