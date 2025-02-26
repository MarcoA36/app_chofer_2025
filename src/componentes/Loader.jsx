// Loader.js
import React from 'react';
// import { TailSpin } from 'react-loader-spinner';
import { Spinner } from 'react-bootstrap';

const Loader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: "100%" }}>
  <Spinner animation="border" variant="primary" />
</div>
);

export default Loader;