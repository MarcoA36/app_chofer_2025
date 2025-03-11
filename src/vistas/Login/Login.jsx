


import React, { useState } from "react";
import "./Auth.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../../api/auth";
import Loader from "../../componentes/Loader";
// import Cookies from 'js-cookie';

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      username: username,
      // password: password,
    };
    setIsLoading(true);

    try {
      const response = await loginRequest(formData);
      if (response.data.success) {
        console.log("Login successful:", response.data);
        console.log("response loginRequest: " + response.data.usuario.usuario)
        login(response.data.usuario);
        localStorage.setItem('token-chofer', response.data.token)
        navigate("/");
      } else {
        console.log("Login failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }finally {
      setIsLoading(false); 
    }
  };

  if (isLoading) {
    return <Loader />; 
  }

  return (
    <div className="login">
      <form onSubmit={handleSubmit} className="form_login card bg-dark px-2 py-3">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="form-control mb-2"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="btn btn-secondary">
          Enviar
        </button>
      </form>


     <div>
      <p>Usuario:"usuario"</p>
      <p>Contraseña:"123456"</p>
     </div>
    </div>
  );
};

export default Login;
