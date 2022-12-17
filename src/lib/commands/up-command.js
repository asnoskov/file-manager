import path from 'node:path';
import InvalidInputError from '../custom-errors/invalid-input-error.js';

const upCommand = {
    commandName: 'up',
    run: async (args) => {
        if (args.length > 0) {
            throw new InvalidInputError();
        }
        const currentDirectoryPath = process.cwd();
        const currentDirectoryParsed = path.parse(currentDirectoryPath);
        const isCurrentDirectoryARoot = currentDirectoryPath === currentDirectoryParsed.root;
        if (isCurrentDirectoryARoot) {
            return;
        }
        process.chdir('..');
    }
}

export default upCommand;