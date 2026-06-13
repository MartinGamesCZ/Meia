export class MeiaEventEmitter<TEventNames extends string, TEvent = any> {
  #listeners: Map<TEventNames, ((...data: TEvent[]) => void)[]> = new Map();

  on(event: TEventNames, listener: (...data: TEvent[]) => void) {
    const listeners = this.#listeners.get(event) ?? [];
    listeners.push(listener);

    this.#listeners.set(event, listeners);
  }

  emit(event: TEventNames, ...data: TEvent[]) {
    const listeners = this.#listeners.get(event) ?? [];

    for (const listener of listeners) {
      listener(...data);
    }
  }

  once(event: TEventNames, listener: (...data: TEvent[]) => void) {
    const wrapper = (...data: TEvent[]) => {
      this.off(event, wrapper);
      listener(...data);
    };

    this.on(event, wrapper);
  }

  off(event: TEventNames, listener: (...data: TEvent[]) => void) {
    const listeners = this.#listeners.get(event) ?? [];

    this.#listeners.set(
      event,
      listeners.filter((l) => l !== listener),
    );
  }
}
