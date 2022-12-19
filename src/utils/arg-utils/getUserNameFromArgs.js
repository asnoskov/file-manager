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

export default getUserNameFromArgs;