
import fs from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { createBrotliCompress } from 'node:zlib';
import InvalidInputError from '../../custom-errors/invalid-input-error.js';

const compressCommand = {
    commandName: 'compress',
    run: async (args) => {
        if (args.length !== 2) {
            throw new InvalidInputError();
        }
        const [pathToFile, pathToDestination] = args.map(a => a.trim());
        
        const brotliCompress = createBrotliCompress();
        const source = fs.createReadStream(pathToFile);
        const destination = fs.createWriteStream(pathToDestination);
    
        await pipeline(source, brotliCompress, destination);
    }
}

export default compressCommand;