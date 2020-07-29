const Files = require('./files');
const Utils = require('./utils');
const path = require('path');
class Main {

    async get_dependencies(project_path, changed_file_path) {
        const source_list = Utils.file_content_to_list_array((await Files.readFile(changed_file_path)));
        const modules = this.source_path_list_to_modules(source_list)
        const dir_dep = await this.get_dir_modules(project_path);
        return this.get_mod_dependencies_rec(dir_dep, modules);
    }

    async get_dir_modules(dir) {
        const dir_dep = {}
        const files = await Files.fetch_files_from_dir(dir);
        for (let index = 0; index < files.length; index++) {
            const file_name = files[index];
            dir_dep[file_name] = await this.fetchDependenciesFromPath(path.join(dir, file_name));
        }
        return dir_dep
    }

    async fetchDependenciesFromPath(module_dir_path) {
        if(!module_dir_path || module_dir_path.length == 0 || !await this.isPathContainModule(module_dir_path)) {
            return null;
        }
        let modules = await Files.readFile(path.join(module_dir_path, ".module"));
        return Utils.file_content_to_list_array(modules);
    }

    async isPathContainModule(source_path) {
        if(await Files.isDir(source_path)) {
            return await Files.containFile(source_path, ".module")
        }
        return false;
    }

    get_mod_dependencies_rec(dir, mod_arr, dep_arr = []) {
        for (let index = 0; mod_arr && index < mod_arr.length; index++) {
            const mod = mod_arr[index];
            if(!dep_arr.includes(mod)) {
                dep_arr.push(mod)
                this.get_mod_dependencies_rec(dir, dir[mod], dep_arr)
            }
        }
        return dep_arr;
    }

    get_mod_name_from_source_path(source_path) {
        return source_path.split("/")[0];
    }

    source_path_list_to_modules(source_list) {
        return source_list.map(f_path => this.get_mod_name_from_source_path(f_path))
    }
}

module.exports = Main;
