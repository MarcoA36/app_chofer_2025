import { Outlet } from "react-router-dom";
import { DataProvider } from "../context/DataContext";
import Home from "./Home/Home";

const ProtectedLayout = () => (
  <DataProvider>
    <Home>
      <Outlet />
    </Home>
  </DataProvider>
);

export default ProtectedLayout;
