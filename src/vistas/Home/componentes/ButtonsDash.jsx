// import React, { useState } from "react";
import { FaStop, FaPlay } from "react-icons/fa";
import { useData } from "../../../context/DataContext";
import { useEffect } from "react";

const ButtonsDash = () => {
  const { isDisponible, setIsDisponible } = useData();

  useEffect(() => {
    const storedDisponible = localStorage.getItem("isDisponible");
    if (storedDisponible !== null) {
      setIsDisponible(JSON.parse(storedDisponible));
    }
  }, [setIsDisponible]);

  const handleDisponibleClick = () => {
    const updatedDisponible = !isDisponible;
    setIsDisponible(updatedDisponible);
    localStorage.setItem("isDisponible", JSON.stringify(updatedDisponible));
  };

  return (
    <div className="control " onClick={handleDisponibleClick}>
      <div className="button">{isDisponible ? <FaStop /> : <FaPlay />}</div>
      {/* {isDisponible ? "Detener" : "Iniciar"} */}
    </div>
  );
};

export default ButtonsDash;
