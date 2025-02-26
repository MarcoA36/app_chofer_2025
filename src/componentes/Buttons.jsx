import React from "react";
import "./Buttons.css";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaSignOutAlt, FaRoute, FaMapMarkerAlt, FaList } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Buttons = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();

    navigate("/");
  };

  return (
    <div className="buttons_group">
      <Link to="/" className="button">
        <FaHome />
      </Link>
      <Link to="/viajes-completados" className="button">
        <FaList />
      </Link>
      <Link to="/mapa" className="button">
        <FaMapMarkerAlt />
      </Link>
      {/* <Link to="/ajustes" className="button">
            <FaCog />
          </Link> */}
      <div className="button" onClick={handleLogout}>
        <FaSignOutAlt />
      </div>
    </div>
  );
};

export default Buttons;
