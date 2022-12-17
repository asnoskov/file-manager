import path from 'node:path';

const getEnclosingDirectoryPath = (directoryPath) => {
    const pathParts = directoryPath.split(path.sep);
    if (pathParts.length > 1) {
        pathParts.pop();
    }
    const enclosingPath = pathParts.length > 1 ? pathParts.join(path.sep) : pathParts + path.sep;
    return enclosingPath;
};

export default getEnclosingDirectoryPath;