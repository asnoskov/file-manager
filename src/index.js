import process from 'node:process';
import getUserNameFromArgs from './lib/arg-utils/getUserNameFromArgs.js';
import { printWelcome } from './lib/app-messages/index.js';
import exitCommand from './lib/commands/exit-command.js';
import userCommandsHandler from './lib/user-commands-handler.js';

printWelcome(getUserNameFromArgs());

userCommandsHandler.registerCommands([exitCommand]);
process.on('SIGINT', async () => {
    await exitCommand.run();
});
await userCommandsHandler.startHandleUserInput();