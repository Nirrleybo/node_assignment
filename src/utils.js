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

    static file_content_to_list_array(file_content) {
        return file_content.split('\n').filter(mod => mod && mod.length > 0);
    }
}


module.exports = Utils;