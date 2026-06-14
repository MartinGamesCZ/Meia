import { MeiaLogger } from "@meia/shared";
import { MeiaCore } from "@meia/core";

export class MeiaApplication {
  static #instance: MeiaApplication;

  static get instance() {
    if (!this.#instance) this.#instance = new MeiaApplication();
    return this.#instance;
  }

  #logger: MeiaLogger = new MeiaLogger(MeiaApplication.name);
  static #core: MeiaCore = new MeiaCore();

  static get $core() {
    return this.#core;
  }

  enableDebugMode(enabled: boolean = true) {
    MeiaLogger.enableDebugLogging(enabled);
  }

  async initialize() {
    this.#logger.log("Initializing Meia application...");

    await MeiaApplication.$core.application.ApplicationInit();
    await MeiaApplication.$core.application.ApplicationStartLoop();
  }
}
