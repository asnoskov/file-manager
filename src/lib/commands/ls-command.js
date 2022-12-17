import fs from 'node:fs/promises';

const FILE_TYPE = 'file';
const DIRECTORY_TYPE = 'directory';
const TYPES_SORT_ORDER = { [FILE_TYPE]: 1, [DIRECTORY_TYPE]: 0 };

const lsCommand = {
    commandName: 'ls',
    run: async (args) => {
        if (args.length > 0) {
            throw new InvalidInputError();
        }
        const workingDirectory = process.cwd();
        const files = await fs.readdir(workingDirectory);
        const fileInfoPromises = files.map(async (file) => 
            {
                const stat = await fs.stat(`${workingDirectory}/${file}`);
                return {
                    Name: file,
                    Type: stat.isFile() ? FILE_TYPE : DIRECTORY_TYPE
                };
            });
        const fileInfos = await Promise.all(fileInfoPromises);
        fileInfos.sort((a, b) => {
            const typeDiff = TYPES_SORT_ORDER[a.Type] - TYPES_SORT_ORDER[b.Type];
            if (typeDiff !== 0) {
                return typeDiff;
            }
            const aName = a.Name.toLocaleLowerCase();
            const bName = b.Name.toLocaleLowerCase()
            return aName.localeCompare(bName);
        });

        console.table(fileInfos);
    }
}

export default lsCommand;