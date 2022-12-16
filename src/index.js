import process from 'node:process';
import getUserNameFromArgs from './lib/arg-utils/getUserNameFromArgs.js';
import { printWelcome, printGoodbye } from './lib/app-messages/index.js';

const handleUserInput = async () => {
    process.stdin.on('data', (data) => {
        process.stdout.write(`!=$command recieved=!\n`)
    });
};

printWelcome(userName);
await handleUserInput();
process.on('SIGINT', () => {
    printGoodbye(getUserNameFromArgs());
    process.exit();
});