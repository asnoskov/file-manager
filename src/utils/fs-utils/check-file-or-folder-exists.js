import fs from 'node:fs/promises';

const checkFileOrFolderExists = async(fileName) => {
    try {
        await fs.access(fileName, fs.constants.F_OK);
        return true;
    }
    catch {
        return false;
    }
}

export { checkFileOrFolderExists };