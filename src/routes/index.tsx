import { Route, Routes } from "react-router-dom";
import Home from "./Home.tsx";
import ErrorPage from "./special/ErrorPage.tsx";
import Loading from "./special/Loading.tsx";
import NotFound from "./special/NotFound.tsx";

const Router = () => {
  return (
    <Routes >
      <Route path="/" element={ <Home /> } errorElement={ <ErrorPage /> } />
      <Route path="/loading" element={ <Loading /> } />
      <Route path="*" element={ <NotFound /> } />
    </Routes >
  );
};

export default Router;
