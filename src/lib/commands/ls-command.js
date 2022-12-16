import { printGoodbye } from "../app-messages/index.js";
import fs from 'node:fs/promises';

const lsCommand = {
    commandName: "ls",
    run: async (args, directoryContext) => {
        const { workingDirectory } = directoryContext;
        const files = await fs.readdir(workingDirectory);
        const fileInfoPromises = files.map(async (file) => 
            {
                const stat = await fs.stat(`${workingDirectory}/${file}`);
                return {
                    Name: file,
                    Type: stat.isFile() ? 'file' : 'directory'
                };
            });
        const fileInfos = await Promise.all(fileInfoPromises);

        console.table(fileInfos);
        /*fileInfos.forEach(fileInfo => {
            console.log(fileInfo.fileName + ` is ${fileInfo.isFile ? 'file':'directory'}`);
        });*/
    }
}

export default lsCommand;