import process from 'node:process';
import os from 'os';
import getUserNameFromArgs from './lib/arg-utils/getUserNameFromArgs.js';
import { printWelcome, printWorkingDirectory } from './lib/app-messages/index.js';
import exitCommand from './lib/commands/exit-command.js';
import lsCommand from './lib/commands/ls-command.js';
import upCommand from './lib/commands/up-command.js';
import cdCommand from './lib/commands/cd-command.js';
import userCommandsHandler from './lib/user-commands-handler.js';
import { VirtualWorkingDirectoryContext } from './working-directory-context.js';

printWelcome(getUserNameFromArgs());

userCommandsHandler.registerCommands([exitCommand, lsCommand, upCommand, cdCommand]);
const workingDirectoryContext = new VirtualWorkingDirectoryContext(os.homedir());
await userCommandsHandler.startHandleUserInput(
    workingDirectoryContext,
    () => printWorkingDirectory(workingDirectoryContext.workingDirectory));
process.on('SIGINT', () => exitCommand.run([]));