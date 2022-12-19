import process from 'node:process';
import os from 'os';
import getUserNameFromArgs from './lib/arg-utils/getUserNameFromArgs.js';
import { printWelcome, printWorkingDirectory } from './lib/app-messages/index.js';
import { exitCommand } from './lib/commands/common/index.js';
import { cdCommand, lsCommand, upCommand } from './lib/commands/working-directory-navigation/index.js';
import { addCommand, catCommand, cpCommand, rnCommand, rmCommand, mvCommand } from './lib/commands/file-operations/index.js';
import { osCommand } from './lib/commands/os-info/index.js';
import { hashCommand } from './lib/commands/hash-calculation/index.js';
import { compressCommand, decompressCommand } from './lib/commands/compression/index.js';
import userCommandsHandler from './lib/user-commands-handler.js';

process.chdir(os.homedir());
printWelcome(getUserNameFromArgs());
userCommandsHandler.registerCommands([
    exitCommand, lsCommand, upCommand, cdCommand, addCommand,
    rnCommand, rmCommand, catCommand, cpCommand, mvCommand, osCommand,
    hashCommand, compressCommand, decompressCommand
]);
await userCommandsHandler.startHandleUserInput(() => printWorkingDirectory(process.cwd()));
process.on('SIGINT', () => exitCommand.run([]));