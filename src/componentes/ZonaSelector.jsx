const ZonaSelector = ({ zonas, zonaSeleccionadaId, onSeleccionarZona, loading }) => {
  const handleZonaChange = (e) => {
    const nuevaZonaId = parseInt(e.target.value, 10);
    onSeleccionarZona(nuevaZonaId);
  };

  return (
    <div className="mt-2">
      <select
        className="form-select form-select-sm"
        onChange={handleZonaChange}
        value={zonaSeleccionadaId || ""}
        disabled={loading}
      >
        <option value="">Seleccionar zona</option>
        {zonas.map((zona) => (
          <option key={zona.id_zona} value={zona.id_zona}>
            {zona.nombre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ZonaSelector;
