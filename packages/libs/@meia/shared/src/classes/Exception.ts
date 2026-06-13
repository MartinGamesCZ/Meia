import chalk from "chalk";
import { MeiaLogger } from "./Logger";

export class MeiaExceptionError extends Error {
  override name: string = "MEIA Exception";

  constructor(message?: string, options?: ErrorOptions) {
    super(message, options);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class MeiaExceptionFatal extends MeiaExceptionError {
  override name: string = "Fatal MEIA Exception";

  constructor(message?: string, options?: ErrorOptions) {
    super(message, options);
  }
}

export const MeiaException = {
  Error: (message?: string, options?: ErrorOptions) =>
    new MeiaExceptionError(message, options),
  Fatal: (message?: string, options?: ErrorOptions) =>
    new MeiaExceptionFatal(message, options),
};

const logger = new MeiaLogger("MeiaException");

process.on("uncaughtException", (error) => {
  if (
    error instanceof MeiaExceptionError &&
    !(error instanceof MeiaExceptionFatal)
  )
    logger.error(error.message);
  else logger.fatal(error.message);

  console.log(chalk.redBright(error.stack));
});
