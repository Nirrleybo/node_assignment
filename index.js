const Main = require('./node_app/main');

process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', reason.stack || reason)
})

function stringArrToObj(strArr) {
    let res = {};
    if (strArr && strArr.length > 0) {
        strArr.forEach((val, index, array) => {
            val = val.split('=');
            res[val[0]] = val.length == 2 ? val[1] : null;
        });
    }
    return res;
}

function main() {
    const args = stringArrToObj(process.argv.slice(2));
    console.log(args);
    const main = new Main();
    // await main.autoEcr(args);
}

main();