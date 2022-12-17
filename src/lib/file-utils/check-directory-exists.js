import fs from 'node:fs/promises';

const checkDirectoryExists = async(directoryPath) => {
    try {
        const stat = await fs.lstat(directoryPath);
        if (stat.isFile()) {
            return false;
        }
        return true;
    }
    catch {
        return false;
    }
}

export default checkDirectoryExists;