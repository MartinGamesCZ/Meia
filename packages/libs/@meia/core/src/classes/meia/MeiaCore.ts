import { MeiaException } from "@meia/shared";
import { MeiaRPC } from "../RPC";
import { MeiaEnvironment } from "./MeiaEnvironment";
import { MeiaCoreApplication } from "./MeiaCoreApplication";
import { MeiaCoreWindow } from "./MeiaCoreWindow";

export enum EMeiaCoreAPIMethod {
  ApplicationInit = "MeiaCoreAPI.ApplicationInit",
  ApplicationStartLoop = "MeiaCoreAPI.ApplicationStartLoop",

  WindowCreate = "MeiaCoreAPI.WindowCreate",
  WindowSetTitle = "MeiaCoreAPI.WindowSetTitle",
  WindowSetDefaultSize = "MeiaCoreAPI.WindowSetDefaultSize",
  WindowResize = "MeiaCoreAPI.WindowResize",
  WindowShow = "MeiaCoreAPI.WindowShow",
}

export class MeiaCore {
  #meiaCoreRPC: MeiaRPC;

  public readonly application: MeiaCoreApplication;
  public readonly window: MeiaCoreWindow;

  constructor() {
    this.#meiaCoreRPC = new MeiaRPC([MeiaEnvironment.paths.native.core]);
    this.application = new MeiaCoreApplication(this.#meiaCoreRPC);
    this.window = new MeiaCoreWindow(this.#meiaCoreRPC);

    this.#attachEventListeners();
  }

  #attachEventListeners() {
    this.#meiaCoreRPC.on("exit", (code: number) => {
      throw MeiaException.Fatal(
        `The meia core process exited with code: ${code}`,
      );
    });
  }
}
