import path from 'node:path';
import InvalidInputError from "../custom-errors/invalid-input-error.js";
import getEnclosingDirectoryPath from '../path-utils/get-enclosing-directory-path.js';

const upCommand = {
    commandName: "up",
    run: async (args, directoryContext) => {
        if (args.length > 0) {
            throw new InvalidInputError();
        }
        const currentDirectoryPath = directoryContext.workingDirectory;
        const currentDirectoryParsed = path.parse(currentDirectoryPath);
        const isCurrentDirectoryARoot = currentDirectoryPath === currentDirectoryParsed.root;
        if (isCurrentDirectoryARoot) {
            return;
        }
        const enclosingDirectoryPath = getEnclosingDirectoryPath(currentDirectoryPath);
        directoryContext.workingDirectory = enclosingDirectoryPath;
    }
}

export default upCommand;