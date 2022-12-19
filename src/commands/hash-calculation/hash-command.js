
import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import InvalidInputError from '../../custom-errors/invalid-input-error.js';

const hashCommand = {
    commandName: 'hash',
    run: async (args) => {
        if (args.length !== 1) {
            throw new InvalidInputError();
        }
        const pathToFile = args[0].trim();
        const fileBuffer = await fs.readFile(pathToFile);
        const hashAsHex = crypto
            .createHash('sha256')
            .update(fileBuffer)
            .digest('hex');
    
        console.log(hashAsHex);
    }
}

export default hashCommand;