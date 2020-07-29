const Main = require('./main');
const Path = require('path');

const DEPENDENCIES_MOCK = require('./mocks/expected_dependencies_result').module;
const DIR_DEP_MOCK = require('./mocks/expected_dir_dep').module;

const PROJ_PATH = "src/mocks/project"
const CHANGED_PATH = "src/mocks/CHANGED.txt"
const MOD_PATH_WITH_DEP = Path.join(PROJ_PATH, "app-backend")
const MOD_PATH_DEP_ARR = [ 'db-integration', 'cache-integration' ];
const MOD_PATH_WITH_NO_DEP = Path.join(PROJ_PATH, "assets");
const PATH_TO_FILE = "src/mocks/project/app-backend/src/main/java/ServiceImpl.java"

const main = new Main();

describe("Test dependencies builder", () => {

    it("should successfully build module dependencies", async () => {
        const mod_dep_arr = await main.get_dependencies(PROJ_PATH, CHANGED_PATH)
        expect(mod_dep_arr).toEqual(DEPENDENCIES_MOCK);
    });

    it("should build dir modules", async () => {
        const dir_dep = await main.get_dir_modules(PROJ_PATH)
        expect(dir_dep).toEqual(DIR_DEP_MOCK);
    });

    it("should fetch modules from source path", async () => {
        const dep_arr = await main.fetchDependenciesFromPath(MOD_PATH_WITH_DEP)
        expect(dep_arr).toEqual(MOD_PATH_DEP_ARR);
    });

    it("should fetch empty array from source path with empty modules file", async () => {
        const dep_arr = await main.fetchDependenciesFromPath(MOD_PATH_WITH_NO_DEP)
        expect(dep_arr).toEqual([]);
    });

    it("should successfully identify that path is a module", async () => {
        expect(await main.isPathContainModule(MOD_PATH_WITH_NO_DEP)).toBeTruthy();
    });

    it("should successfully identify that path is NOT a module", async () => {
        expect(await main.isPathContainModule(PATH_TO_FILE)).toBeFalsy();
    });

});

