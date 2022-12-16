const printWelcome = (userName) => process.stdout.write(`Welcome to the File Manager, ${userName}!\n`);

const printGoodbye = (userName) => process.stdout.write(`\nThank you for using File Manager, ${userName}, goodbye!\n`);

export { printWelcome, printGoodbye };