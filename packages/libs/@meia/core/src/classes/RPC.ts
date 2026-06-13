import { MeiaEventEmitter, MeiaException, MeiaLogger } from "@meia/shared";
import { spawn, type ChildProcess } from "child_process";
import { randomUUID } from "crypto";

type MeiaRPCEventNames = "exit" | "response";

export class MeiaRPC extends MeiaEventEmitter<MeiaRPCEventNames> {
  #logger: MeiaLogger = new MeiaLogger(MeiaRPC.name);
  #command: string[];
  #process: ChildProcess;
  #isRunning: boolean = true;

  get isRunning() {
    return this.#isRunning;
  }

  constructor(command: string[]) {
    super();

    this.#command = command;

    this.#logger.debug("Starting rpc:", this.#command.join(" "));

    this.#process = spawn(this.#command[0]!, this.#command.slice(1));
    this.#process.on("error", () => this.#handleError());
    this.#process.on("exit", (code) => this.#handleExit(code ?? -1));
    this.#process.on("spawn", () => (this.#isRunning = true));
    this.#process.stdout?.on("data", this.#handleData.bind(this));
  }

  async call(method: string, params: unknown) {
    const id = randomUUID();

    this.#process.stdin?.write(
      JSON.stringify({
        method,
        params: [params],
        id,
      }) + "\n",
    );

    return await this.#waitForResponse(id);
  }

  #waitForResponse(wantedId: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      const handler = (id: string, result: string) => {
        if (id != wantedId) return;

        resolve(result);
        this.off("response", handler);
      };

      const i = setTimeout(() => {
        reject(MeiaException.Error("Timed out"));
        this.off("response", handler);
      }, 5000);

      this.on("response", (id, result) => {
        clearTimeout(i);
        handler(id, result);
      });
    });
  }

  #handleData(chunk: Buffer) {
    const json = chunk.toString();

    try {
      const { id, result } = JSON.parse(json);

      this.emit("response", id, result);
    } catch (_) {}
  }

  #handleError() {
    this.#emitExit(1);

    throw MeiaException.Error(
      "The RPC connection threw an error: " + this.#command.join(" "),
    );
  }

  #handleExit(code: number) {
    this.#emitExit(code);

    if (code != 0) return this.#handleError();
  }

  #emitExit(code: number) {
    if (!this.#isRunning) return;

    this.#isRunning = false;
    this.emit("exit", code);
  }
}
