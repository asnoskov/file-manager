import fs from 'node:fs';
import { checkFileOrFolderExists } from './check-file-or-folder-exists.js';

const copyFile = async (originalFileName, newFileName) => {
    if ((!await checkFileOrFolderExists(originalFileName))
        || await checkFileOrFolderExists(newFileName)
    ) {
        throw new Error("FS operation failed");
    }

    const originalFileAsReadable = fs.createReadStream(originalFileName);
    const newFileAsWritable = fs.createWriteStream(newFileName);
    
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

export default copyFile;