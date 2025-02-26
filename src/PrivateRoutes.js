import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Loader from "./componentes/Loader";

const PrivateRoutes = () => {
  const { isAuth, loading } = useAuth();
  if (loading) {
    return <Loader/>; 
  }
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
