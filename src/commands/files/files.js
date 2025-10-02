import path from "path";
import stream from "stream";
import fs from "fs/promises";
import fsPromises from "fs/promises";
import {list} from "../nwd/nwd.js";
import {getWorkDir} from "../os/oscmd.js";

export const readFile = async (pathToFile) => {
    try {
        const stat = await fs.stat(pathToFile).catch(() => {throw new Error('Operation failed')})

        if (stat.isDirectory()) {
            list(pathToFile);
            return
        }
        const fileContent = await fs.readFile(pathToFile , 'utf8');
        console.log("\x1b[32m", fileContent, '\x1b[0m');
        console.log('You are currently in ', getWorkDir());
    } catch (e) {
        console.error("\x1b[31m", 'Operation failed', "\x1b[0m");
    }
    
    // try {
    //     const readableStream = stream.createReadStream(pathToFile, { encoding: 'utf8' })
    //     await stream.pipeline(readableStream, process.stdout);
    // } catch (e) {
    //
    // }
}

export const create = async (pathToFile) => {
    try {
        await fsPromises.open(pathToFile, 'wx');
        console.log("\x1b[32m", 'File has created', '\x1b[0m');
    }
    catch (e) {
        throw new Error('Operation failed');
    }

    // let fh;
    // try {
    //     fh = await fs.open(pathToFile, 'w');
    // } catch (e) {
    //     console.log('Operation failed')
    // } finally {
    //     fh?.close();
    // }
};

export const remove = async (filePath) => {
    try {
        const stat = await fs.stat(filePath).catch(() => {throw new Error('Operation failed')});

        if (stat.isDirectory()) {
            throw new Error('Operation failed')
        }

        await fs.unlink(filePath);
        console.log('You are currently in ', getWorkDir());
    } catch (e) {
        console.error('\x1b[31m', e.message, '\x1b[0m');
    }

    // await fs.unlink(filePath);
};

export const rename = async (oldName, newName) => {
    try {
        await fs.rename(oldName, newName).catch(() => {throw new Error('Operation failed')});
        console.log("\x1b[32m", 'File has renamed', '\x1b[0m');
        console.log('You are currently in ', getWorkDir());
    } catch (e) {
        console.error('\x1b[31m', e.message, '\x1b[0m');
    }
};

export const copy = async (path_to_file, path_to_new_directory) => {
    try {
        const stat = await fs.stat(path.resolve(path_to_file)).catch(() => {throw new Error('Operation failed')});

        if (!stat.isDirectory()) {
            copyFile(path_to_file, path_to_new_directory);
        } else {
            copyDir(path_to_file, path_to_new_directory);
        }

    } catch (e) {
        console.error('\x1b[31m', e.message, '\x1b[0m');
    }

    // try {
    //     const readableStream = stream.createReadStream(path_to_file)
    //     const writableStream = stream.createWriteStream(path_to_new_directory)
    //     await stream.pipeline(readableStream, writableStream)
    //     // console.log('')
    // } catch (error) {
    //     console.error('Operation failed')
    // }

}

export const copyFile = async (path_to_file, path_to_new_directory = '') => {
    try {
        await fs.copyFile(path.resolve(path_to_file), path.resolve(path_to_new_directory, path_to_file + '.copy')).catch(() => {throw new Error('Operation failed')});
        console.log("\x1b[32m", 'File has copied', '\x1b[0m');
        console.log('You are currently in ', getWorkDir());
    } catch (e) {
        console.error('\x1b[31m', e.message, '\x1b[0m');
    }

}

export const copyDir = async (path_to_file, path_to_new_directory = '') => {
    const newPath = path_to_file + '-copy'
    try {
        await fs.mkdir(path.resolve(path_to_new_directory, newPath));

        const files = await fs.readdir(path_to_file);
        await Promise.all(files.map((file) => fs.copyFile(path.resolve(path_to_file, file), path.resolve(path_to_new_directory, newPath, file))))
        console.log("\x1b[32m", 'Folder has copied', '\x1b[0m');
        console.log('You are currently in ', getWorkDir());
    } catch (e) {
        console.error('\x1b[31m', e.message, '\x1b[0m');
    }
}

export const moveFile = async (path_to_file, path_to_new_directory) => {
    try {
        const stat = await fs.stat(path.resolve(path_to_file)).catch(() => {throw new Error('Operation failed')});

        if (!stat.isDirectory()) {
            await fs.copyFile(path.resolve(path_to_file), path.resolve(path_to_new_directory, path_to_file))
                .catch(() => {throw new Error('Operation failed')});
            await remove(path_to_file)
                .catch(() => {throw new Error('Operation failed')});
            console.log("\x1b[32m", 'File has moved', '\x1b[0m');
        } else {
            throw new Error('Operation failed');
        }

    } catch (e) {
        console.error('\x1b[31m', e.message, '\x1b[0m');
    }

    // const readableStream = createReadStream(pathToFile)
    // const writableStream = createWriteStream(pathToNewDirectory)
    // await pipeline(readableStream, writableStream)
    // await unlink(pathToFile)


}
