import process from 'node:process';

const getUserNameFromArgs = () => {
    const defaultName = 'Anonimous';
    const userNameArg = process.argv
        .find(a => a.toLowerCase().startsWith('--username='));
    const userNameArgParts = userNameArg && userNameArg.split('=');
    const userName = userNameArgParts && userNameArgParts.length == 2 && userNameArgParts[1].trim();
    if (!userName) {
        return defaultName;
    }
    return userName;
}

const printWelcome = async (userName) => process.stdout.write(`Welcome to the File Manager, ${userName}!\n`);

const printGoodbye = async (userName) => process.stdout.write(`Thank you for using File Manager, ${userName}, goodbye!\n`);

const handleUserInput = async () => {
    
};

const userName = getUserNameFromArgs();
await printWelcome(userName);
await handleUserInput();
await printGoodbye(userName);