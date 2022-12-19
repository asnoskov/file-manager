import fs from 'node:fs/promises';
import path from 'node:path';
import InvalidInputError from '../../custom-errors/invalid-input-error.js';
import { checkFileOrFolderExists } from '../../utils/fs-utils/check-file-or-folder-exists.js';

const rnCommand = {
    commandName: 'rn',
    run: async (args) => {
        if (args.length !== 2) {
            throw new InvalidInputError();
        }
        const workingDirectory = process.cwd();
        const pathToFile = path.resolve(workingDirectory, args[0].trim());
        const fileDirectory = path.dirname(pathToFile);
        const newFileName = path.resolve(fileDirectory, args[1].trim());

        if ((!await checkFileOrFolderExists(pathToFile))
            || await checkFileOrFolderExists(newFileName)
        ) {
            throw new Error("FS operation failed");
        }
        
        await fs.rename(pathToFile, newFileName);
    }
}

export default rnCommand;