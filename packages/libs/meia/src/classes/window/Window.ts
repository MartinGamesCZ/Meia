import { MeiaException } from "@meia/shared";
import { MeiaApplication } from "../application/Application";

export interface IMeiaWindowOptions {
  title: string;
  width: number;
  height: number;
}

export class MeiaWindow {
  #options: IMeiaWindowOptions;
  #id: string | null = null;

  constructor(options: Partial<IMeiaWindowOptions>) {
    const fullOptions: IMeiaWindowOptions = {
      title: "Meia window",
      width: 800,
      height: 600,
      ...options,
    };

    this.#options = fullOptions;
  }

  async open() {
    if (!this.#id) await this.#_create();

    await this.#setProperties();

    await this.#_show();
  }

  async setTitle(title: string) {
    if (!this.#id) throw MeiaException.Error("Window not created");

    this.#options.title = title;
    await this.#_setTitle();
  }

  async setSize(width: number, height: number) {
    if (!this.#id) throw MeiaException.Error("Window not created");

    this.#options.width = width;
    this.#options.height = height;

    await this.#_setSize();
  }

  async #_create() {
    const { Id } = await MeiaApplication._core.window.WindowCreate();
    this.#id = Id;
  }

  async #setProperties() {
    if (!this.#id) throw MeiaException.Error("Window not created");

    await this.#_setTitle();
    await this.#_setSize();
  }

  async #_setTitle() {
    if (!this.#id) throw MeiaException.Error("Window not created");

    await MeiaApplication._core.window.WindowSetTitle({
      Id: this.#id,
      Title: this.#options.title,
    });
  }

  async #_setSize() {
    if (!this.#id) throw MeiaException.Error("Window not created");

    await MeiaApplication._core.window.WindowSetSize({
      Id: this.#id,
      Width: this.#options.width,
      Height: this.#options.height,
    });
  }

  async #_show() {
    if (!this.#id) throw MeiaException.Error("Window not created");

    await MeiaApplication._core.window.WindowShow({ Id: this.#id });
  }
}
