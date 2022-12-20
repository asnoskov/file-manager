const printWelcome = (userName) => process.stdout.write(`Welcome to the File Manager, ${userName}!\n`);

const printGoodbye = (userName) => process.stdout.write(`Thank you for using File Manager, ${userName}, goodbye!\n`);

const printWorkingDirectory = (workingDirectory) => process.stdout.write(`You are currently in ${workingDirectory}\n`);

export { printWelcome, printGoodbye, printWorkingDirectory };