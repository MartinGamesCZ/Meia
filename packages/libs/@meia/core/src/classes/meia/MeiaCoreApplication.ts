import type { MeiaRPC } from "../RPC";
import { EMeiaCoreAPIMethod } from "./MeiaCore";

export class MeiaCoreApplication {
  #coreRpc: MeiaRPC;

  constructor(coreRpc: MeiaRPC) {
    this.#coreRpc = coreRpc;
  }

  async ApplicationInit(): Promise<void> {
    await this.#coreRpc.call(EMeiaCoreAPIMethod.ApplicationInit, {});
  }

  async ApplicationStartLoop(): Promise<void> {
    await this.#coreRpc.call(EMeiaCoreAPIMethod.ApplicationStartLoop, {});
  }
}
