import { Category, Component, Palette, Variant, } from "@react-buddy/ide-toolbox";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import MUIPalette from "@react-buddy/palette-mui";
import { Fragment } from "react";

export const PaletteTree = () => (
  <Palette >
    <Category name="App" >
      <Component name="Loader" >
        <Variant >
          <ExampleLoaderComponent />
        </Variant >
      </Component >
    </Category >
    <MUIPalette />
  </Palette >
);

export function ExampleLoaderComponent() {
  return (
    <Fragment >Loading...</Fragment >
  );
}
