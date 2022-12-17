import process from 'node:process';
import os from 'os';
import getUserNameFromArgs from './lib/arg-utils/getUserNameFromArgs.js';
import { printWelcome, printWorkingDirectory } from './lib/app-messages/index.js';
import exitCommand from './lib/commands/exit-command.js';
import lsCommand from './lib/commands/ls-command.js';
import upCommand from './lib/commands/up-command.js';
import cdCommand from './lib/commands/cd-command.js';
import addCommand from './lib/commands/add-command.js';
import rnCommand from './lib/commands/rn-command.js';
import userCommandsHandler from './lib/user-commands-handler.js';

process.chdir(os.homedir());
printWelcome(getUserNameFromArgs());
userCommandsHandler.registerCommands([exitCommand, lsCommand, upCommand, cdCommand, addCommand, rnCommand]);
await userCommandsHandler.startHandleUserInput(() => printWorkingDirectory(process.cwd()));
process.on('SIGINT', () => exitCommand.run([]));