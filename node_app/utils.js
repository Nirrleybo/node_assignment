class Utils {

    static cmd_string_to_obj_args() {
        const strArr = process.argv.slice(2);
        let res = {};
        if (strArr && strArr.length > 0) {
            strArr.forEach((val, index, array) => {
                val = val.split('=');
                res[val[0]] = val.length == 2 ? val[1] : null;
            });
        }
        return res;
    }
}


module.exports = Utils;