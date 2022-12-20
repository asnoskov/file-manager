
import fs from 'node:fs/promises';
import path from 'node:path';
import InvalidInputError from '../../custom-errors/invalid-input-error.js';
import copyFile from '../../utils/fs-utils/copy-file.js';

const mvCommand = {
    commandName: 'mv',
    run: async (args) => {
        if (args.length !== 2) {
            throw new InvalidInputError();
        }
        const [pathToFile, pathToNewDirectory] = args.map(a => a.trim());
        
        const fileName = path.basename(pathToFile);
        const workingDirectory = process.cwd();

        const absolutePathToFile = path.resolve(workingDirectory, fileName);
        const absolutePathToNewFile = path.resolve(pathToNewDirectory, fileName);

        await copyFile(absolutePathToFile, absolutePathToNewFile);
        await fs.unlink(absolutePathToFile);
    }
}

export default mvCommand;