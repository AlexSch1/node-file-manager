import { chdir, cwd } from 'process';
import * as os from "os";
import * as path from "path";
import {HOME_DIR} from "../../constants/constants.js";

export const setWorkDir = (pathToDir) => {
    chdir(pathToDir);

    console.log('You are currently in ', getWorkDir());
}

export const addNewDirToPath = (dir) => {
    const newDir = path.resolve(dir);

    setWorkDir(newDir);
}

export const getWorkDir = () => {
    return cwd();
}

export const printEOL = () => {
    console.log("\x1b[32m", `${JSON.stringify(os.EOL)}`, '\x1b[0m');
    console.log('You are currently in ', getWorkDir());
}

export const printCpus = () => {
    console.log(os.cpus());
    console.log('You are currently in ', getWorkDir());
}

export const printHomeDir = () => {
    console.log("\x1b[32m", HOME_DIR, '\x1b[0m');
    console.log('You are currently in ', getWorkDir());
}

export const printUserName = () => {
    console.log("\x1b[32m", os.userInfo().username, '\x1b[0m');
    console.log('You are currently in ', getWorkDir());
}

export const printArchitecture = () => {
    console.log("\x1b[32m", os.arch(), '\x1b[0m');
    console.log('You are currently in ', getWorkDir());
}

export const osOperations = (command) => {
    switch (command) {
        case '--EOL':
            printEOL();
            break;
        case '--cpus':
            printCpus();
            break;
        case '--homedir':
            printHomeDir();
            break;
        case '--username':
            printUserName();
            break;
        case '--architecture':
            printArchitecture();
            break;
        default:
            console.log('Invalid input');
            break
    }
}

