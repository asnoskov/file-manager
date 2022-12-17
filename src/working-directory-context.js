// there were debates in our discort channel about which way of handling working directory to use
// (storing it in variable or using and changing actual node process working directory instead), so I placed this logic
// in this "working directory context" that provides interface for access and changing working directory path.
// default implementation uses special variable (this is why it's called "Virtual" in opposit to real/process working directory), but it can be easily replaced by 
// version that uses process.cwd() and process.chdir() under the hood (if needed) without changing other parts of application.

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