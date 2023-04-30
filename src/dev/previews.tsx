import { ComponentPreview, Previews } from "@react-buddy/ide-toolbox";
import Logo from "../components/Logo.tsx";
import LogtoButton from "../components/LogtoButton.tsx";
import { PaletteTree } from "./palette";

const ComponentPreviews = () => {
  return (
    <Previews palette={ <PaletteTree /> } >
      <ComponentPreview path="/LogtoButton" >
        <LogtoButton />
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
