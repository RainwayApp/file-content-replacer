
const core = require('@actions/core');
const fs = require('fs');

async function run() {
    try {
        const version = core.getInput('version')
        const filename = core.getInput('filename')
        try {
            console.log(`Looking for file ${filename}`);
            await fs.promises.access(filename, fs.constants.F_OK | fs.constants.W_OK);

            console.log(`found file ${filename} and now setting version ${version}`);
        } catch (err) {

            core.setFailed(err.message)
        }


    } catch (error) {

        core.setFailed(error.message)
    }
}

run();