import fs from 'node:fs/promises';
import InvalidInputError from '../../custom-errors/invalid-input-error.js';
import { checkFileOrFolderExists } from '../../utils/fs-utils/check-file-or-folder-exists.js';

const rmCommand = {
    commandName: 'rm',
    run: async (args) => {
        if (args.length !== 1) {
            throw new InvalidInputError();
        }

        const fileToRemove = args[0].trim();
        if (!await checkFileOrFolderExists(fileToRemove)) {
            throw new Error("FS operation failed");
        }
        
        await fs.unlink(fileToRemove);
    }
}

export default rmCommand;