import { MeiaException } from "@meia/shared";
import { MeiaRPC } from "../RPC";
import { MeiaEnvironment } from "./MeiaEnvironment";
import { MeiaCoreApplication } from "./MeiaCoreApplication";
import { MeiaCoreWindow } from "./MeiaCoreWindow";
import { MeiaCoreWidget } from "./MeiaCoreWidget";

export enum EMeiaCoreAPIMethod {
  ApplicationInit = "MeiaCoreAPI.ApplicationInit",
  ApplicationStartLoop = "MeiaCoreAPI.ApplicationStartLoop",

  WindowCreate = "MeiaCoreAPI.WindowCreate",
  WindowSetTitle = "MeiaCoreAPI.WindowSetTitle",
  WindowSetDefaultSize = "MeiaCoreAPI.WindowSetDefaultSize",
  WindowResize = "MeiaCoreAPI.WindowResize",
  WindowShow = "MeiaCoreAPI.WindowShow",

  WidgetCreate = "MeiaCoreAPI.WidgetCreate",
  WidgetAppend = "MeiaCoreAPI.WidgetAppend",
  WidgetLoadURI = "MeiaCoreAPI.WidgetLoadURI",
}

export class MeiaCore {
  #meiaCoreRPC: MeiaRPC;

  public readonly application: MeiaCoreApplication;
  public readonly window: MeiaCoreWindow;
  public readonly widget: MeiaCoreWidget;

  constructor() {
    this.#meiaCoreRPC = new MeiaRPC([MeiaEnvironment.paths.native.core]);
    this.application = new MeiaCoreApplication(this.#meiaCoreRPC);
    this.window = new MeiaCoreWindow(this.#meiaCoreRPC);
    this.widget = new MeiaCoreWidget(this.#meiaCoreRPC);

    this.#attachEventListeners();
  }

  #attachEventListeners() {
    this.#meiaCoreRPC.on("exit", (code: number, error: string) => {
      throw MeiaException.Fatal(
        `The meia core process exited with code: ${code} with error: ${error}`,
      );
    });
  }
}
