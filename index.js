
const core = require('@actions/core');
const replace = require('replace-in-file');

async function run() {
    try {
        const from = core.getInput('from', { required: true });
        const to = core.getInput('to', { required: true });
        const files = core.getInput('files', { required: true });
        const options = { files, from: new RegExp(from), to };

        const results = await replace(options);
        console.log(results);

    } catch (error) {

        core.setFailed(error.message)
    }
}

run();