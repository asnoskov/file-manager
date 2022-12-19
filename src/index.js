import process from 'node:process';
import os from 'os';
import getUserNameFromArgs from './utils/arg-utils/getUserNameFromArgs.js';
import { printWelcome, printWorkingDirectory } from './app-messages/index.js';
import { exitCommand } from './commands/common/index.js';
import { cdCommand, lsCommand, upCommand } from './commands/working-directory-navigation/index.js';
import { addCommand, catCommand, cpCommand, rnCommand, rmCommand, mvCommand } from './commands/file-operations/index.js';
import { osCommand } from './commands/os-info/index.js';
import { hashCommand } from './commands/hash-calculation/index.js';
import { compressCommand, decompressCommand } from './commands/compression/index.js';
import userCommandsHandler from './user-commands-handler.js';

process.chdir(os.homedir());
printWelcome(getUserNameFromArgs());
userCommandsHandler.registerCommands([
    exitCommand, lsCommand, upCommand, cdCommand, addCommand,
    rnCommand, rmCommand, catCommand, cpCommand, mvCommand, osCommand,
    hashCommand, compressCommand, decompressCommand
]);
await userCommandsHandler.startHandleUserInput(() => printWorkingDirectory(process.cwd()));
process.on('SIGINT', () => exitCommand.run([]));