const Main = require('./node_app/main');
const Logger = require('./node_app/logger');
const Utils = require('./node_app/utils');
const Files = require('./node_app/files');

process.on('unhandledRejection', (reason, promise) => {
    Logger.error(`Unhandled Rejection\n${reason.stack || reason}`)
})

async function main() {
    const args = Utils.cmd_string_to_obj_args();
    // console.log(args);
    let source_list = await Files.readFile(args.file);
    source_list = source_list.split('\n');
    // console.log(source_list);
    const main = new Main();
    return await main.source_code_list_to_modules_and_dependencies(source_list);
}

main();