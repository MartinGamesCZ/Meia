import { MeiaLogger } from "@meia/shared";
import { MeiaCore } from "@meia/core";

export class MeiaApplication {
  static #logger: MeiaLogger = new MeiaLogger(MeiaApplication.name);

  static #core: MeiaCore = new MeiaCore();

  static enableDebugMode(enabled: boolean = true) {
    MeiaLogger.enableDebugLogging(enabled);
  }

  static initialize() {
    this.#logger.log("Initializing Meia application...");
    this.#core.rpc.core
      .call("MeiaCoreAPI.Hello", { Name: "Meia" })
      .then((r) => console.log(r));
  }
}
