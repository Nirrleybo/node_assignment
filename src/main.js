const Files = require('./files');
const path = require('path');
const Utils = require('./utils');
class Main {

    async get_dependencies(project_path, changed_file_path) {
        const source_list = Utils.file_content_to_list_array((await Files.readFile(changed_file_path)));
        const modules = source_list.map(f_path => this.get_mod_name_from_source_path(f_path))
        const dir_dep = await this.get_dir_modules(project_path);
        return this.get_mod_dependencies_rec(dir_dep, modules, []);
    }

    async get_dir_modules(dir) {
        const dir_dep = {}
        const files = await Files.fetch_files_from_dir(dir);
        for (let index = 0; index < files.length; index++) {
            const file_name = files[index];
            dir_dep[file_name] = await this.source_code_path_to_module(path.join(dir, file_name));
        }
        return dir_dep
    }

    async source_code_path_to_module(source_code_path) {
        if(!source_code_path || source_code_path.length == 0 || !await this.isPathContainModule(source_code_path)) {
            return null;
        }
        return await this.fetchDependenciesFromModulefile(source_code_path); 
    }

    async isPathContainModule(source_path) {
        if(await Files.isDir(source_path)) {
            return await Files.containFile(source_path, ".module")
        }
        return false;
    }

    async fetchDependenciesFromModulefile(module_dir_path) {
        let modules = await Files.readFile(path.join(module_dir_path, ".module"));
        return Utils.file_content_to_list_array(modules);
    }

    get_mod_dependencies_rec(dir, mod_arr, dep_arr) {
        for (let index = 0; index < mod_arr.length; index++) {
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
}

module.exports = Main;
