// implementation that stores app working directory in local variable.
// it provides common interface for access and changing working directory,
// so it can be easily replaced by another implementation that uses process current working directory instead (if needed)
class VirtualWorkingDirectoryContext {
    _workingDirectory = null;

    constructor(initialCurrentDirectory) {
        this._workingDirectory = initialCurrentDirectory;
    }

    get workingDirectory() {
        return this._workingDirectory;
    }
    set workingDirectory(directoryPath) {
        this._workingDirectory = directoryPath;
    }
};

export { VirtualWorkingDirectoryContext };