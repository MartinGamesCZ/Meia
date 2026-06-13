import { MeiaException } from "@meia/shared";
import { MeiaRPC } from "../RPC";
import { MeiaEnvironment } from "./MeiaEnvironment";

export class MeiaCore {
  #meiaCoreRPC: MeiaRPC;

  get rpc() {
    return {
      core: this.#meiaCoreRPC,
    };
  }

  constructor() {
    this.#meiaCoreRPC = new MeiaRPC([MeiaEnvironment.paths.native.core]);

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
