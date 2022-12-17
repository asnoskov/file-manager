import path from 'node:path';
import InvalidInputError from "../custom-errors/invalid-input-error.js";

const DIRECTORY_DOES_NOT_EXIST = "directory does not exist";

const cdCommand = {
    commandName: "cd",
    run: async (args) => {
        if (args.length > 1) {
            throw new InvalidInputError();
        }
        if (!args.length) {
            // at least mac terminal allows cd without any arguments
            // and does nothing in this case, so I do the same in my implementation
            return;
        }
        const pathFromArgs = args[0].trim();
        process.chdir(pathFromArgs);
    }
}

export default cdCommand;