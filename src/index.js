import process from 'node:process';
import getUserNameFromArgs from './lib/arg-utils/getUserNameFromArgs.js';
import { printWelcome, printWorkingDirectory } from './lib/app-messages/index.js';
import exitCommand from './lib/commands/exit-command.js';
import userCommandsHandler from './lib/user-commands-handler.js';
import { VirtualWorkingDirectoryContext } from './working-directory-context.js';

printWelcome(getUserNameFromArgs());

const workingDirectoryContext = new VirtualWorkingDirectoryContext(process.cwd())
userCommandsHandler.registerCommands([exitCommand]);
await userCommandsHandler.startHandleUserInput(
    workingDirectoryContext,
    () => printWorkingDirectory(workingDirectoryContext.workingDirectory));
process.on('SIGINT', exitCommand.run);