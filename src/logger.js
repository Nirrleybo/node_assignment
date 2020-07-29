class Logger {
    
    static error(err_msg) { console.error(`***** Error *****\n${err_msg}\n***************`) }
    static log(msg) { console.log(`${msg}`); }
}


module.exports = Logger;