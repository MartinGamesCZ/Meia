import type { MeiaRPC } from "../RPC";
import { EMeiaCoreAPIMethod } from "./MeiaCore";

export class MeiaCoreWindow {
  #coreRpc: MeiaRPC;

  constructor(coreRpc: MeiaRPC) {
    this.#coreRpc = coreRpc;
  }

  async WindowCreate(): Promise<{
    Id: string;
  }> {
    return (await this.#coreRpc.call(EMeiaCoreAPIMethod.WindowCreate, {})) as {
      Id: string;
    };
  }

  async WindowSetTitle(data: { Id: string; Title: string }): Promise<void> {
    await this.#coreRpc.call(EMeiaCoreAPIMethod.WindowSetTitle, data);
  }

  async WindowSetSize(data: {
    Id: string;
    Width: number;
    Height: number;
  }): Promise<void> {
    await this.#coreRpc.call(EMeiaCoreAPIMethod.WindowSetSize, data);
  }

  async WindowShow(data: { Id: string }): Promise<void> {
    await this.#coreRpc.call(EMeiaCoreAPIMethod.WindowShow, data);
  }
}
