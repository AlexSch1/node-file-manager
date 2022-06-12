import {
    setWorkDir
} from "./src/commands/os/oscmd.js";
import {HOME_DIR} from "./src/constants/constants.js";
import {pipeline} from "stream";
import validateCommands from "./src/commands/handleCommands.js";
import parseCommands from "./src/commands/parseCommands.js";

process.stdin.setEncoding('utf8');

setWorkDir(HOME_DIR);

export const USER_NAME = process.argv[2].split('=')[1];

const handleErrorPipeline = (err) => {
    if (err) {
        console.error('\x1b[31m', err.message, '\x1b[0m');
    }
};

process.on('uncaughtException', (e) => {
    console.error('\x1b[31m', e.message, '\x1b[0m');
});

process.on('unhandledRejection', (e) => {
    console.error('\x1b[31m', e.message, '\x1b[0m');
});

process.on('SIGINT', function() {
    console.log("\x1b[32m", `Thank you for using File Manager, ${USER_NAME}!`, '\x1b[0m');
    process.exit(0);
});

async function main() {
    console.log("\x1b[32m", `Welcome to the File Manager, ${USER_NAME}!`, '\x1b[0m');
    pipeline(
        process.stdin,
        validateCommands,
        parseCommands,
        handleErrorPipeline,
    );

}
main();