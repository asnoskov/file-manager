import InvalidInputError from "./custom-errors/invalid-input-error.js";

const INVALID_INPUT_MESSAGE = 'Invalid input';
const OPERATION_FAILED_MESSAGE = "Operation failed";
const commandsMap = {};

let _inputHandled = false;

const handleUserInput = (input) => {
    const commandParts = input.toString().split(' ');
    const commandName = commandParts[0].trim().toLocaleLowerCase();
    const command = commandsMap[commandName];
    if (command) {
        try {
            command.run(commandParts);
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
};

const startHandleUserInput = async () => {
    if (_inputHandled) return;
    _inputHandled = true;
    process.stdin.on('data', handleUserInput);
};

const registerCommands = (commands) => commands.forEach(c => commandsMap[c.commandName] = c );

export default {
    registerCommands,
    startHandleUserInput
};