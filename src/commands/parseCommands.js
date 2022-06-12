import {Transform} from "stream";
import {list, up, cd} from "./nwd/nwd.js";
import {copy, create, moveFile, readFile, remove, rename} from "./files/files.js";
import {osOperations} from "./os/oscmd.js";
import {calculateHash} from "./hash/hash.js";
import {compress, decompress} from "./zip/zipFiles.js";
import {USER_NAME} from "../../index.js";

const parseCommands = new Transform(
    {
        transform(chunk, encoding, cb) {
            const command = chunk.toString().trim().split(' ')[0];
            const command2 = chunk.toString().trim().split(' ')[1];
            const command3 = chunk.toString().trim().split(' ')[2];

            switch (command) {
                case 'up':
                    up();
                    break;
                case 'ls':
                    list();
                    break;
                case 'cd':
                    cd(command2);
                    break;
                case 'cat':
                    readFile(command2);
                    break;
                case 'add':
                    create(command2);
                    break;
                case 'rn':
                    rename(command2, command3);
                    break;
                case 'cp':
                    copy(command2, command3);
                    break;
                case 'mv':
                    moveFile(command2, command3);
                    break;
                case 'rm':
                    remove(command2);
                    break;
                case 'os':
                    osOperations(command2);
                    break;
                case 'hash':
                    calculateHash(command2);
                    break;
                case 'compress':
                    compress(command2, command3);
                    break;
                case 'decompress':
                    decompress(command2, command3);
                    break;
                case '.exit':
                    console.log("\x1b[32m", `Thank you for using File Manager, ${USER_NAME}!`, '\x1b[0m');
                    process.exit(0);
                    break;
            }

            cb(null, chunk);
        } }
);


export default parseCommands

