import fs from 'node:fs/promises';
import InvalidInputError from '../../custom-errors/invalid-input-error.js';

const addCommand = {
    commandName: 'add',
    run: async (args) => {
        if (args.length !== 1) {
            throw new InvalidInputError();
        }
        const filePath = args[0].trim();
        await fs.writeFile(filePath, '', { flag: 'wx' });
    }
}

export default addCommand;