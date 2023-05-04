import Badge from "@mui/material/Badge";

const Logo = () => {
  // const delay = useServerDelay();
  const delay: number | null = 100;
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
    <div className={ "w-full h-16 flex rounded-lg justify-center" } >
      <div className={ "m-auto text-left text-3xl font-bold text-black select-none" } >
        <Badge variant="dot" color={ color } >
          Althea
        </Badge >
      </div >
    </div >
  );
};

export default Logo;
