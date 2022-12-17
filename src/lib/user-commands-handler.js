import InvalidInputError from './custom-errors/invalid-input-error.js';

const INVALID_INPUT_MESSAGE = 'Invalid input';
const OPERATION_FAILED_MESSAGE = 'Operation failed';
const commandsMap = {};

let _inputHandled = false;

const handleUserInput = async (input, onBeforeUserInput) => {
    const commandParts = input.toString().split(' ');
    const commandName = commandParts[0].trim().toLocaleLowerCase();
    const command = commandsMap[commandName];
    if (command) {
        try {
            const commandArgs = commandParts.slice(1, commandParts.length);
            await command.run(commandArgs);
        }
        catch (e) {
            if (e instanceof InvalidInputError) {
                process.stdout.write(INVALID_INPUT_MESSAGE + '\n');
            }
            else {
                process.stdout.write(OPERATION_FAILED_MESSAGE + '\n');
            }
        }           
    }
    else {
        process.stdout.write(INVALID_INPUT_MESSAGE + '\n');
    }
    onBeforeUserInput && onBeforeUserInput();
};

const startHandleUserInput = async (onBeforeUserInput) => {
    if (_inputHandled) return;
    _inputHandled = true;
    onBeforeUserInput && onBeforeUserInput();
    process.stdin.on('data', async (data) => await handleUserInput(data, onBeforeUserInput));
};

const registerCommands = (commands) => commands.forEach(c => commandsMap[c.commandName] = c );

export default {
    registerCommands,
    startHandleUserInput
};