import { printGoodbye } from "../app-messages/index.js";
import getUserNameFromArgs from "../arg-utils/getUserNameFromArgs.js";
import InvalidInputError from "../custom-errors/invalid-input-error.js";

const exitCommand = {
    commandName: ".exit",
    run: async (args, directoryContext) => {
        if (args.length > 0) {
            throw new InvalidInputError();
        }
        printGoodbye(getUserNameFromArgs());
        process.exit();
    }
}

export default exitCommand;