const Main = require('./src/main');
const Logger = require('./src/logger');
const Utils = require('./src/utils');
const Files = require('./src/files');
const path = require('path');

process.on('unhandledRejection', (reason, promise) => {
    Logger.error(`Unhandled Rejection\n${reason.stack || reason}`)
})

async function main() {
    let args = Utils.cmd_string_to_obj_args();
    // let defaults = {
    //     project_path: "src/project",
    //     changed_file_path: "src/mocks/CHANGED.txt"
    // };
    let defaults = {
        project_path: "sample-project",
        changed_file_path: "CHANGED.txt"
    };
    args = Object.assign(defaults, args);

    const project_path = path.join(__dirname, args.project_path);
    const changed_file_path = path.join(__dirname, args.changed_file_path);
    
    const main = new Main();

    return await main.get_dependencies(project_path, changed_file_path)
}

main().then(x => console.log(x.join(" ")))