import React from "react";

const CardSolicitudViaje = ({ origen, zona, hora, onAceptar, onRechazar }) => {
  return (
    <div style={styles.modal}>
      <div style={styles.container}>
        <h2 style={styles.title}>Solicitud de viaje</h2>
        <p style={styles.origen}>{origen}</p>
        <p style={styles.zona}>
          zona: <span style={styles.zonaValue}>{zona}</span>
        </p>
        <p style={styles.hora}>hora: {hora}</p>
        <div style={styles.buttons}>
          <button style={{ ...styles.btn, ...styles.aceptar }} onClick={onAceptar}>
            aceptar
          </button>
          <button style={{ ...styles.btn, ...styles.rechazar }} onClick={onRechazar}>
            rechazar
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  modal: {
    backgroundColor: "rgba(0,0,0,0.6)",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  container: {
    border: "2px solid black",
    padding: "24px",
    maxWidth: "320px",
    width: "90%",
    textAlign: "center",
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  },
  title: {
    fontWeight: "bold",
    fontSize: "20px",
    marginBottom: "12px",
  },
  origen: {
    fontSize: "22px",
    color: "goldenrod",
    margin: "0 0 8px 0",
  },
  zona: {
    fontSize: "14px",
    margin: "4px 0",
  },
  zonaValue: {
    color: "orange",
    fontWeight: "bold",
  },
  hora: {
    fontSize: "14px",
    marginBottom: "20px",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
  },
  btn: {
    flex: 1,
    fontSize: "16px",
    padding: "10px 0",
    cursor: "pointer",
    border: "2px solid black",
    borderRadius: "8px",
    fontWeight: "bold",
    transition: "all 0.2s",
  },
  aceptar: {
    backgroundColor: "#e6ffe6",
  },
  rechazar: {
    backgroundColor: "#ffe6e6",
  },
};

export default CardSolicitudViaje;
