import { Outlet } from "react-router-dom";
import Buttons from "../../componentes/Buttons";
import useSocketHandler from "../../hooks/socketHandler";
import { useData } from "../../context/DataContext";
import Loader from "../../componentes/Loader";
// import BarraDeCarga from "../../componentes/BarraDeCarga";

function Home() {
  const { loadingData } = useData();
  console.log("home renderizado")
  useSocketHandler();
  return (
    <>
      <div className="dashboard">
        {/* <Outlet /> */}
        {loadingData ? <Loader /> : <Outlet />}
      </div>
      <Buttons />
    </>
  );
}

export default Home;
