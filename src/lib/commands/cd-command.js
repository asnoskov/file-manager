import path from 'node:path';
import InvalidInputError from "../custom-errors/invalid-input-error.js";
import checkDirectoryExists from '../file-utils/check-directory-exists.js';

const DIRECTORY_DOES_NOT_EXIST = "directory does not exist";

const cdCommand = {
    commandName: "cd",
    run: async (args, directoryContext) => {
        if (args.length > 1) {
            throw new InvalidInputError();
        }
        if (!args.length) {
            // at least mac terminal allows cd without any arguments
            // and does nothing in this case, so I do the same in my implementation
            return;
        }
        const currentWorkingDirectory = directoryContext.workingDirectory;
        const pathFromArgs = args[0].trim();
        const newWorkingDirectory = path.isAbsolute(pathFromArgs)
            ? pathFromArgs
            : path.join(currentWorkingDirectory, pathFromArgs);

        if (!await checkDirectoryExists(newWorkingDirectory)) {
            throw new Error(DIRECTORY_DOES_NOT_EXIST);
        }

        directoryContext.workingDirectory = newWorkingDirectory;
    }
}

export default cdCommand;