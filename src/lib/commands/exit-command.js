import { printGoodbye } from "../app-messages/index.js";
import getUserNameFromArgs from "../arg-utils/getUserNameFromArgs.js";

const exitCommand = {
    commandName: ".exit",
    run: async (args, directoryContext) => {
        printGoodbye(getUserNameFromArgs());
        process.exit();
    }
}

export default exitCommand;