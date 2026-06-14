import type { MeiaRPC } from "../RPC";
import { EMeiaCoreAPIMethod } from "./MeiaCore";

export enum EMeiaCoreWidgetType {
  Webview = "webview",
}

export class MeiaCoreWidget {
  #coreRpc: MeiaRPC;

  constructor(coreRpc: MeiaRPC) {
    this.#coreRpc = coreRpc;
  }

  async WidgetCreate(data: {
    WindowId: string;
    Type: EMeiaCoreWidgetType;
  }): Promise<{
    Id: string;
  }> {
    return (await this.#coreRpc.call(
      EMeiaCoreAPIMethod.WidgetCreate,
      data,
    )) as {
      Id: string;
    };
  }

  async WidgetAppend(data: {
    WindowId: string;
    WidgetId: string;
  }): Promise<void> {
    await this.#coreRpc.call(EMeiaCoreAPIMethod.WidgetAppend, data);
  }

  async WidgetLoadURI(data: {
    WindowId: string;
    WidgetId: string;
    URI: string;
  }): Promise<void> {
    await this.#coreRpc.call(EMeiaCoreAPIMethod.WidgetLoadURI, data);
  }
}
