import fs from 'node:fs';
import { stdout } from 'node:process';
import InvalidInputError from '../../custom-errors/invalid-input-error.js';

const catCommand = {
    commandName: 'cat',
    run: async (args) => {
        if (args.length !== 1) {
            throw new InvalidInputError();
        }
        const filePath = args[0].trim();
        const fileAsReadable = fs.createReadStream(filePath);
        try {
            return await new Promise((resolve, reject) => {
                fileAsReadable.on('error', r => reject(r));
                fileAsReadable.on('end', r => resolve(r));
                fileAsReadable.pipe(stdout);
            });
        }
        catch (e) {
            fileAsReadable.destroy();
            throw e;
        }
    }
}

export default catCommand;