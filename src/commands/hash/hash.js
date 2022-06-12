import fs from "fs/promises";
import crypto from "crypto";
import {getWorkDir} from "../os/oscmd.js";

export const calculateHash = async (fileToPath) => {
    try {
        const data = await fs.readFile(fileToPath);
        const hash = crypto.createHash('sha256').update(data).digest('hex');

        console.log("\x1b[32m", hash, '\x1b[0m');
        console.log('You are currently in ', getWorkDir());
    } catch (e) {
        console.error("\x1b[31m", `Operation failed`, "\x1b[0m");
    }
};