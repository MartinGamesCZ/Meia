import { EMeiaCoreWidgetType } from "@meia/core/src/classes/meia/MeiaCoreWidget";
import { MeiaException } from "@meia/shared";
import { MeiaWindow } from "../window/Window";
import { MeiaApplication } from "../application/Application";

export abstract class MeiaWidget {
  #id: string | null = null;
  #type: EMeiaCoreWidgetType;
  #window: MeiaWindow | null = null;

  constructor(type: EMeiaCoreWidgetType) {
    this.#type = type;
  }

  async #create() {
    if (this.#id) throw MeiaException.Error("Widget already created");
    if (!this.#window) throw MeiaException.Error("Window not bound");
    if (!this.#window.id) throw MeiaException.Error("Window not created");

    const { Id } = await MeiaApplication.$core.widget.WidgetCreate({
      WindowId: this.#window.id,
      Type: this.#type,
    });
    this.#id = Id;
  }

  async $bindWindow(window: MeiaWindow) {
    if (!window.id) throw MeiaException.Error("Window not created");

    this.#window = window;

    if (!this.#id) await this.#create();
    await this.#appendToWindow();
  }

  protected async callCoreMethod<
    TMethod extends keyof typeof MeiaApplication.$core.widget,
    TData extends Omit<
      Parameters<(typeof MeiaApplication.$core.widget)[TMethod]>[0],
      "WindowId" | "WidgetId"
    >,
  >(method: TMethod, data: TData) {
    if (!this.#id) throw MeiaException.Error("Widget not created");
    if (!this.#window) throw MeiaException.Error("Window not bound");
    if (!this.#window.id) throw MeiaException.Error("Window not created");

    await MeiaApplication.$core.widget[method]({
      WidgetId: this.#id,
      WindowId: this.#window.id,
      ...data,
    } as any);
  }

  async #appendToWindow(): Promise<void> {
    if (!this.#id) throw MeiaException.Error("Widget not created");
    if (!this.#window) throw MeiaException.Error("Window not bound");
    if (!this.#window.id) throw MeiaException.Error("Window not created");

    await MeiaApplication.$core.widget.WidgetAppend({
      WidgetId: this.#id,
      WindowId: this.#window.id,
    });
  }
}
