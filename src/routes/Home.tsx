import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer.tsx";
import Menu from "../components/menu/Menu.tsx";
import { useLogin } from "../hooks";

const HomeComponent = () => {
  const { isAuthenticated, login } = useLogin();
  
  useEffect(() => {
    async function isLogin() {
      if (!isAuthenticated) {
        await login();
      }
    }
    
    isLogin().then();
  }, [ isAuthenticated, login ]);
  
  return (
    <div className={ "flex w-screen h-screen" }>
      <div className={ "w-72" }>
        <Menu />
      </div>
      <div className="flex-1 h-screen flex flex-col">
        <div className={ "w-full h-[calc(100vh-1.5rem)] relative" }>
          <Outlet />
        </div>
        <div className="h-6 my-1">
          <Footer />
        </div>
      </div>
    </div>
  );
};

const Home = (HomeComponent);

export default Home;
