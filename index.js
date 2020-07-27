const Main = require('./node_app/main');
const Logger = require('./node_app/logger');
const Utils = require('./node_app/utils')

process.on('unhandledRejection', (reason, promise) => {
    Logger.error(`Unhandled Rejection\n${reason.stack || reason}`)
})

function main() {
    const args = Utils.cmd_string_to_obj_args()
    console.log(args);
    // await main.autoEcr(args);
}

main();