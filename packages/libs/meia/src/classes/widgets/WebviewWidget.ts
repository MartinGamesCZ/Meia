import { EMeiaCoreWidgetType } from "@meia/core/src/classes/meia/MeiaCoreWidget";
import { MeiaWidget } from "./Widget";

export class MeiaWebviewWidget extends MeiaWidget {
  constructor() {
    super(EMeiaCoreWidgetType.Webview);
  }

  async loadURI(uri: string): Promise<void> {
    await this.callCoreMethod("WidgetLoadURI", {
      URI: uri,
    });
  }
}
