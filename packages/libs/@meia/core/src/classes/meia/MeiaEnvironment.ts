import path from "path";

export class MeiaEnvironment {
  constructor() {}

  public static get paths() {
    return {
      native: {
        core: path.join(
          import.meta.dirname,
          "../../../../../../native/meia/core/scripts/dev",
        ),
      },
    };
  }
}
