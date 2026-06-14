import { MeiaWindow } from "../window/Window";

export abstract class MeiaRenderer {
  constructor() {}

  abstract onWindowOpen(window: MeiaWindow): void;
}
