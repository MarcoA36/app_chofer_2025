import React from 'react'
import { useData } from '../../../context/DataContext'

const Mensaje = () => {
  const {isDisponible} = useData()
  return (
    <p className={`p-4 m-2 rounded text-center text-white fs-1 ${isDisponible ? 'bg-success' : 'bg-secondary'}`}>
    {isDisponible ? 'Disponible' : 'No disponible'}
  </p>
  )
}

export default Mensaje