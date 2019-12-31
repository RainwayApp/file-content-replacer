
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
            try {
                let content = await fs.promises.readFile(filename, "utf-8");
                content=content.replace(/\[assembly:\s*AssemblyVersion\(".*"\)]/g,`[assembly: AssemblyVersion("${version}")]`)
                    .replace(/\[assembly:\s*AssemblyFileVersion\(".*"\)]/g,`[assembly: AssemblyFileVersion("${version}")]`);
                
                await fs.promises.writeFile(filename,content);
                
                 
            } catch (err) {
                core.setFailed(err.message);
            }
        } catch (err) {

            core.setFailed(err.message)
        }
    } catch (error) {

        core.setFailed(error.message)
    }
}

run();