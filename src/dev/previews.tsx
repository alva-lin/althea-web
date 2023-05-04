import { ComponentPreview, Previews } from "@react-buddy/ide-toolbox";
import Logo from "../components/menu/Logo.tsx";
import LogtoMenuItem from "../components/menu/LogtoMenuItem.tsx";
import { PaletteTree } from "./palette";

const ComponentPreviews = () => {
  return (
    <Previews palette={ <PaletteTree /> } >
      <ComponentPreview path="/LogtoButton" >
        <LogtoMenuItem />
      </ComponentPreview >
      <ComponentPreview path="/Logo" >
        <Logo />
      </ComponentPreview >
      <ComponentPreview path="/ComponentPreviews" >
        <ComponentPreviews />
      </ComponentPreview >
    </Previews >
  );
};

export default ComponentPreviews;
