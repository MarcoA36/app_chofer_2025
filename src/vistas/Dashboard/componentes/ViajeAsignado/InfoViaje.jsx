import React from 'react'

const InfoViaje = ({viaje}) => {
  return (
    <div className="d-flex justify-content-between align-items-center my-3 p-3 rounded-3 border border-warning bg-warning">
    <h3 className="text-lg">{viaje.origen}</h3>
    <p className="fw-bold">
      {viaje.fecha_asignado_time}
    </p>
  </div>
  )
}

export default InfoViaje