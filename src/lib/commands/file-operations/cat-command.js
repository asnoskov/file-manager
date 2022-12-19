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
        for await (const data of fileAsReadable) {
            stdout.write(data);
        }
        stdout.write('\n');
    }
}

export default catCommand;