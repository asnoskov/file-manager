import process from 'node:process';
import os from 'os';
import getUserNameFromArgs from './lib/arg-utils/getUserNameFromArgs.js';
import { printWelcome, printWorkingDirectory } from './lib/app-messages/index.js';
import exitCommand from './lib/commands/exit-command.js';
import lsCommand from './lib/commands/ls-command.js';
import userCommandsHandler from './lib/user-commands-handler.js';
import { VirtualWorkingDirectoryContext } from './working-directory-context.js';

printWelcome(getUserNameFromArgs());

const workingDirectoryContext = new VirtualWorkingDirectoryContext(os.homedir());
userCommandsHandler.registerCommands([exitCommand, lsCommand]);
await userCommandsHandler.startHandleUserInput(
    workingDirectoryContext,
    () => printWorkingDirectory(workingDirectoryContext.workingDirectory));
process.on('SIGINT', exitCommand.run);