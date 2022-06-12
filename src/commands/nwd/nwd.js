import * as fs from 'fs/promises';
import path from "path";
import {addNewDirToPath, getWorkDir, setWorkDir} from "../os/oscmd.js";
import {HOME_DIR, PATH_SEP} from "../../constants/constants.js";

export const list = async (dirPath) => {
    try {
        const files = await fs.readdir(dirPath || getWorkDir());
        for (const file of files) {
            console.log("\x1b[32m", file, '\x1b[0m');
        }

        console.log('You are currently in ', getWorkDir());
    } catch (e) {
        console.log(e.message)
    }
};

export const cd = async (pathToDir) => {
    try {
        await fs.access(path.resolve(pathToDir));

        addNewDirToPath(pathToDir);
    } catch (e) {
        console.log('Invalid input');
    }
}

export const up = async () => {
    try {
        const rootPath = HOME_DIR.split(PATH_SEP)[0];

        if (getWorkDir() === rootPath) {
            return
        }

        //TODO
        // investigate cross platform operation
        const newPath = path.normalize(path.resolve( '..'));

        setWorkDir(newPath);

    } catch (e) {
        console.error("\x1b[31m", e.message, "\x1b[0m");
    }
}