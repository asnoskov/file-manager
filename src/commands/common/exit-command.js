import { printGoodbye } from '../../app-messages/index.js';
import getUserNameFromArgs from '../../utils/arg-utils/getUserNameFromArgs.js';
import InvalidInputError from '../../custom-errors/invalid-input-error.js';

const exitCommand = {
    commandName: '.exit',
    run: async (args) => {
        if (args.length > 0) {
            throw new InvalidInputError();
        }
        printGoodbye(getUserNameFromArgs());
        process.exit();
    }
}

export default exitCommand;