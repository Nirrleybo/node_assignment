const Main = require('./src/main');
const Logger = require('./src/logger');
const Utils = require('./src/utils');

process.on('unhandledRejection', (reason, promise) => {
    Logger.error(`Unhandled Rejection\n${reason.stack || reason}`)
})

function fetch_args() {
    let args = Utils.cmd_string_to_obj_args();
    let defaults = {
        project_path: "sample-project",
        changed_file_path: "CHANGED.txt"
    };
    return Object.assign(defaults, args);
}

async function main() {
    const args = fetch_args();
    const main = new Main();
    return await main.get_dependencies(args.project_path, args.changed_file_path)
}

main().then(x => console.log(x.join(" ")))