import os from 'node:os';
import { stdout } from 'node:process';
import InvalidInputError from '../custom-errors/invalid-input-error.js';

const printEndOfLine = () => stdout.write(JSON.stringify(os.EOL));
const printCpusInfo = () => {
    const cpus = os.cpus();
    console.log(`Overall CPUS amount: ${cpus.length}`);
    const cpusDetailsToPrint = cpus.map(c => ({ model: c.model, speed: c.speed }));
    console.table(cpusDetailsToPrint);
}
const printHomeDir = () => stdout.write(os.homedir());
const printUserName = () => stdout.write(os.userInfo().username);
const printArch = () => stdout.write(os.arch());

const argToSubCommandMap = {
    'eol': printEndOfLine,
    'cpus': printCpusInfo,
    'homedir': printHomeDir,
    'username': printUserName,
    'architecture': printArch
}

const osCommand = {
    commandName: 'os',
    run: async (args) => {
        if (args.length !== 1 || !args[0].startsWith('--')) {
            throw new InvalidInputError();
        }
        const argNormalized = args[0]
            .slice(2, args[0].length)
            .toLowerCase()
            .trim();
        const subCommand = argToSubCommandMap[argNormalized];
        if (!subCommand) {
            throw new InvalidInputError();
        }
        subCommand();
        stdout.write('\n');
    }
}

export default osCommand;