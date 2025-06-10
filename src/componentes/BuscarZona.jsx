import React, { useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';

const BuscarZona = ({ onBuscar, loading }) => {
  const [direccion, setDireccion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (direccion.trim() !== '') {
      onBuscar(direccion.trim());
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="d-flex align-items-center gap-2">
      <Form.Control
        type="text"
        placeholder="Ingresar dirección o lugar"
        value={direccion}
        onChange={(e) => setDireccion(e.target.value)}
      />
      <Button type="submit" variant="primary" disabled={loading}>
        {loading ? <Spinner animation="border" size="sm" /> : 'Buscar'}
      </Button>
    </Form>
  );
};

export default BuscarZona;
