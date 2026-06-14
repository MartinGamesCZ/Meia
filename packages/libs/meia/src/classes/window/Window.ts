import { MeiaException } from "@meia/shared";
import { MeiaApplication } from "../application/Application";
import { MeiaRenderer } from "../renderer/Renderer";
import { MeiaWidget } from "../widgets/Widget";

export interface IMeiaWindowOptions {
  title: string;
  width: number;
  height: number;
}

export class MeiaWindow {
  #options: IMeiaWindowOptions;
  #id: string | null = null;
  #renderer: MeiaRenderer | null = null;
  #widgets: MeiaWidget[] = [];

  get id() {
    return this.#id;
  }

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
    if (!this.#id) await this.#$create();

    await this.#setProperties();

    await this.#$show();

    this.#renderer?.onWindowOpen(this);
  }

  async setTitle(title: string) {
    if (!this.#id) throw MeiaException.Error("Window not created");

    this.#options.title = title;
    await this.#$setTitle();
  }

  async setSize(width: number, height: number) {
    if (!this.#id) throw MeiaException.Error("Window not created");

    this.#options.width = width;
    this.#options.height = height;

    await this.#$setSize();
  }

  async addWidget(widget: MeiaWidget): Promise<void> {
    if (!this.#id) throw MeiaException.Error("Window not created");

    this.#widgets.push(widget);
    await widget.$bindWindow(this);
  }

  async #$create() {
    const { Id } = await MeiaApplication.$core.window.WindowCreate();
    this.#id = Id;

    await this.#$setDefaultSize();
  }

  async #setProperties() {
    if (!this.#id) throw MeiaException.Error("Window not created");

    await this.#$setTitle();
    await this.#$setSize();
  }

  async setRenderer(renderer: new () => MeiaRenderer) {
    this.#renderer = new renderer();
  }

  async #$setTitle() {
    if (!this.#id) throw MeiaException.Error("Window not created");

    await MeiaApplication.$core.window.WindowSetTitle({
      Id: this.#id,
      Title: this.#options.title,
    });
  }

  async #$setDefaultSize() {
    if (!this.#id) throw MeiaException.Error("Window not created");

    await MeiaApplication.$core.window.WindowSetDefaultSize({
      Id: this.#id,
      Width: this.#options.width,
      Height: this.#options.height,
    });
  }

  async #$setSize() {
    if (!this.#id) throw MeiaException.Error("Window not created");

    await MeiaApplication.$core.window.WindowResize({
      Id: this.#id,
      Width: this.#options.width,
      Height: this.#options.height,
    });
  }

  async #$show() {
    if (!this.#id) throw MeiaException.Error("Window not created");

    await MeiaApplication.$core.window.WindowShow({ Id: this.#id });
  }
}
