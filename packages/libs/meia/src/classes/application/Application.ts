import { MeiaLogger } from "@meia/shared";
import { MeiaCore } from "@meia/core";

export class MeiaApplication {
  static #logger: MeiaLogger = new MeiaLogger(MeiaApplication.name);

  static #core: MeiaCore = new MeiaCore();

  static get _core() {
    return MeiaApplication.#core;
  }

  static enableDebugMode(enabled: boolean = true) {
    MeiaLogger.enableDebugLogging(enabled);
  }

  static async initialize() {
    this.#logger.log("Initializing Meia application...");

    await this.#core.application.ApplicationInit();
    await this.#core.application.ApplicationStartLoop();
  }
}
