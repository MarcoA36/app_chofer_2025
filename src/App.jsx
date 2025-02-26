// import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";
// import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import Home from "./vistas/Home/Home";
// import Info from "./vistas/Info/Info";
// import Buttons from "./componentes/Buttons";
// import Login from "./vistas/Login/Login";
// import { useAuth } from "./context/AuthContext";
// import TablaViajes from "./vistas/Viajes/TablaViajes";
// import Loader from "./componentes/Loader";
// import Mapa from "./vistas/Mapa/Mapa";
// import { useData } from "./context/DataContext";
// import useSocketHandler from "./hooks/socketHandler";

// function App() {

// const {isAuth, loading} = useAuth()
// const {loadingData} = useData()
// useSocketHandler()

// console.log(loading)
// console.log(loadingData)
//   return (
//     <BrowserRouter>
//       <div className="App">
//         <div className="app_container">
//           <div className="dashboard">
//             {loading || loadingData ? (
//               <Loader />
//             ) : (
//               <Routes>
//                 <Route path="/login" element={<Login />} />
//                 <Route
//                   path="/"
//                   element={isAuth ? <Home /> : <Navigate to="/login" />}
//                 />
//                 <Route
//                   path="/info"
//                   element={isAuth ? <Info /> : <Navigate to="/login" />}
//                 />
//                 <Route
//                   path="/viajes-completados"
//                   element={isAuth ? <TablaViajes /> : <Navigate to="/login" />}
//                 />
//                 <Route
//                   path="/mapa"
//                   element={isAuth ? <Mapa /> : <Navigate to="/login" />}
//                 />
//               </Routes>
//             )}
//           </div>
//           {isAuth && !loading && <Buttons />}
//         </div>
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;



// function App() {
//   const { isAuth } = useAuth();
//   const { loadingData } = useData();
//   useSocketHandler();

//   if (loadingData) return <Loader />;

//   return (
//     <BrowserRouter>
//       <div className="App">
//         <div className="app_container">
//           <div className="dashboard">
//             <Routes>
//               <Route path="/login" element={isAuth ? <Navigate to="/" /> : <Login />} />
//               <Route path="/" element={isAuth ? <Home /> : <Navigate to="/login" />} />
//               <Route path="/info" element={isAuth ? <Info /> : <Navigate to="/login" />} />
//               <Route path="/viajes-completados" element={isAuth ? <TablaViajes /> : <Navigate to="/login" />} />
//               <Route path="/mapa" element={isAuth ? <Mapa /> : <Navigate to="/login" />} />
//             </Routes>
//           </div>
//           {isAuth && <Buttons />}
//         </div>
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;



import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Home from "./vistas/Home/Home";
import Login from "./vistas/Login/Login";
import TablaViajes from "./vistas/Viajes/TablaViajes";
import Mapa from "./vistas/Mapa/Mapa";
import Dashboard from "./vistas/Dashboard/Dashboard";
import PrivateRoutes from "./PrivateRoutes";
// import ProtectedLayout from "./vistas/ProtectedLayout";
import Home from "./vistas/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="app_container">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<Home />}>
                <Route index element={<Dashboard />} />
                <Route path="/viajes-completados" element={<TablaViajes />} />
                <Route path="/mapa" element={<Mapa/>} />
              </Route>
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
