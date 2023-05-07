import { Outlet } from "react-router-dom";
import Footer from "../components/Footer.tsx";
import Menu from "../components/menu/Menu.tsx";

const HomeComponent = () => {
  
  return (
    <div className={ "flex w-screen h-screen" }>
      <div className={ "w-72 " }>
        <Menu />
      </div>
      <div className="flex-1 flex flex-col">
        <div className={ "flex-1 relative overflow-y-auto" }>
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
