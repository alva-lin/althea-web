import Badge from "@mui/material/Badge";
import useServerDelay from "../hooks/useServerDelay.tsx";

const Logo = () => {
  const delay = useServerDelay();
  let color: "default" | "success" | "warning" | "error" | "primary" | "secondary" | "info";
  if (delay === null) {
    color = "default";
  } else if (delay < 200) {
    color = "success";
  } else if (delay < 500) {
    color = "warning";
  } else {
    color = "error";
  }
  
  return (
    <div
      className={ "flex w-48 h-16 rounded-lg justify-center cursor-pointer bg-gray-200 hover:bg-gray-300" } >
      <div className={ "m-auto text-left text-3xl font-bold text-black select-none" } >
        <Badge variant="dot" color={ color } >
          Althea
        </Badge >
      </div >
    </div >
  );
};

export default Logo;
