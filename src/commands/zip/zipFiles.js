import * as zlib from 'zlib';
import * as stream from 'stream';
import path from "path";
import * as fs from "fs";
import {getWorkDir} from "../os/oscmd.js";

export const compress = async (path_to_file, path_to_destination) => {
    try {
        const brotliCompressStream = zlib.createBrotliCompress({
            chunkSize: 32 * 1024,
            params: {
                [zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_TEXT,
                [zlib.constants.BROTLI_PARAM_QUALITY]: 4,
                [zlib.constants.BROTLI_PARAM_SIZE_HINT]: fs.statSync(path_to_file).size
            }
        });
        const source = fs.createReadStream(path_to_file);
        const destination = fs.createWriteStream(path.join(path_to_destination, `${path_to_file}.gzip`));

        stream.pipeline(source, brotliCompressStream, destination, (err) => {
            if (err) {
                console.error("\x1b[31m", `Oops: ${err.message}`, "\x1b[0m");
            }
            console.log('You are currently in ', getWorkDir());
        });
    } catch (e) {
        console.error("\x1b[31m", `Operation failed`, "\x1b[0m");
    }

};

export const decompress = async (path_to_file, path_to_destination) => {
    try {
        const source = fs.createReadStream(path_to_file);
        const destination = fs.createWriteStream(path.resolve(path_to_destination, `${path_to_file.split('.gzip')[0]}`));

        const gunzip = zlib.createBrotliDecompress();

        stream.pipeline(source, gunzip, destination, (err) => {
            if (err) {
                console.error("\x1b[31m", `Oops: ${err.message}`, "\x1b[0m");
            }
            console.log('You are currently in ', getWorkDir());
        });
    } catch (e) {
        console.error("\x1b[31m", `Operation failed`, "\x1b[0m");
    }



};
