import {Transform} from "stream";

const commands = [
    'up',
    'cd',
    'ls',
    'cat',
    'add',
    'rn',
    'cp',
    'mv',
    'rm',
    'os',
    'os --EOL',
    'os --cpus',
    'os --homedir',
    'os --username',
    'os --username',
    'os --architecture',
    'hash',
    'compress',
    'decompress',
]

const validateCommands = new Transform(
    {
        transform(chunk, encoding, cb) {
            const stdinCommand = chunk.toString().trim().split(' ')[0];
            try {
                if (commands.includes(stdinCommand)) {
                    cb(null, chunk);
                } else {
                    const er = new Error('Invalid input');
                    // cb(er);
                    cb(null, chunk);

                    throw er;
                }
            } catch (e) {
                throw e;
            }

        } }
);


export default validateCommands

