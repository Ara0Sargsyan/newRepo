import { Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes";
import "./App.css";
import { useSelector } from "react-redux";
import Dashboard from "./Layout/Dashboard";
import Home from "./Layout/Home";

function App() {
  const logined = useSelector((state) => state.loginRegistrReducer.logined);

  return (
    <>
      {logined ? (
        <Routes>
          {privateRoutes.map(({ path, component }) => {
            return <Route key={path} path={path} element={component} exact />;
          })}
          <Route path="*" element={<Dashboard />} />;
        </Routes>
      ) : (
        <Routes>
          {publicRoutes.map(({ path, component }) => {
            return <Route key={path} path={path} element={component} exact />;
          })}
          <Route path="*" element={<Home />} />;
        </Routes>
      )}
    </>
  );
}

export default App;
