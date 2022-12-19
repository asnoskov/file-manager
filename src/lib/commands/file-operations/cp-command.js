import fs from 'node:fs';
import path from 'node:path';
import InvalidInputError from '../../custom-errors/invalid-input-error.js';
import { checkFileOrFolderExists } from '../../fs-utils/check-file-or-folder-exists.js';

const cpCommand = {
    commandName: 'cp',
    run: async (args) => {
        if (args.length !== 2) {
            throw new InvalidInputError();
        }
        const [pathToFile, pathToNewDirectory] = args.map(a => a.trim());
        
        const fileName = path.basename(pathToFile);
        const workingDirectory = process.cwd();

        const absolutePathToFile = path.resolve(workingDirectory, fileName);
        const absolutePathToNewFile = path.resolve(pathToNewDirectory, fileName);
        
        if ((!await checkFileOrFolderExists(absolutePathToFile))
            || await checkFileOrFolderExists(absolutePathToNewFile)
        ) {
            throw new Error("FS operation failed");
        }

        const originalFileAsReadable = fs.createReadStream(absolutePathToFile);
        const newFileAsWritable = fs.createWriteStream(absolutePathToNewFile);

        try {
            return await new Promise((resolve, reject) => {
                originalFileAsReadable.on('error', r => reject(r));
                newFileAsWritable.on('error', r => reject(r));
                newFileAsWritable.on('finish', r => resolve(r));
                originalFileAsReadable.pipe(newFileAsWritable);
            });
        }
        catch (e) {
            originalFileAsReadable.destroy();
            newFileAsWritable.end();
            throw e;
        }
    }
}

export default cpCommand;