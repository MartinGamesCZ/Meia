import { MeiaWindow } from "../window/Window";
import { MeiaRenderer } from "./Renderer";

export class MeiaWebRenderer extends MeiaRenderer {
  constructor() {
    super();
  }

  onWindowOpen(window: MeiaWindow) {
    console.log("AAAAAAAAAAAAAAAAAA");
  }
}
