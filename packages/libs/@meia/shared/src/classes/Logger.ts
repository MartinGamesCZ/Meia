import chalk from "chalk";

export enum EMeiaLoggerLevel {
  Info,
  Warning,
  Error,
  Debug,
  Fatal,
}

export class MeiaLogger {
  static readonly #libraryName: string = "MEIA";
  static readonly #levelPrefixes: {
    [key in EMeiaLoggerLevel]: string;
  } = {
    [EMeiaLoggerLevel.Info]: chalk.blue("info "),
    [EMeiaLoggerLevel.Warning]: chalk.yellow("warn "),
    [EMeiaLoggerLevel.Error]: chalk.red("error"),
    [EMeiaLoggerLevel.Debug]: chalk.magenta("debug"),
    [EMeiaLoggerLevel.Fatal]: chalk.bold(chalk.redBright("fatal")),
  };

  static #isDebugLoggingEnabled: boolean = process.env.MEIA_DEBUG_MODE === "1";

  static get isDebugLoggingEnabled() {
    return this.#isDebugLoggingEnabled;
  }

  static enableDebugLogging(enabled: boolean = true) {
    this.#isDebugLoggingEnabled = enabled;
  }

  #componentName: string;

  constructor(componentName: string) {
    this.#componentName = componentName;
  }

  log(...args: any[]) {
    this.info(...args);
  }

  info(...args: any[]) {
    this.#printMessage(EMeiaLoggerLevel.Info, args);
  }

  warning(...args: any[]) {
    this.#printMessage(EMeiaLoggerLevel.Warning, args);
  }

  error(...args: any[]) {
    this.#printMessage(EMeiaLoggerLevel.Error, args);
  }

  debug(...args: any[]) {
    if (!MeiaLogger.#isDebugLoggingEnabled) return;

    this.#printMessage(EMeiaLoggerLevel.Debug, args);
  }

  fatal(...args: any[]) {
    this.#printMessage(EMeiaLoggerLevel.Fatal, args);
  }

  #printMessage(type: EMeiaLoggerLevel, args: any[]) {
    console.log(
      `${this.#libName} ${this.#pid} - ${this.#timestamp} ${MeiaLogger.#levelPrefixes[type]}  ${chalk.green(`[${this.#componentName}]`)}`,
      ...args,
    );
  }

  get #libName() {
    return chalk.cyan(MeiaLogger.#libraryName);
  }

  get #pid() {
    return chalk.gray(process.pid);
  }

  get #timestamp() {
    return chalk.gray(
      new Date().toLocaleDateString("en-UK", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }) +
        ", " +
        new Date().toLocaleTimeString("en-UK", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
    );
  }
}
