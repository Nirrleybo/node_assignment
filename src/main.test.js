const Main = require('./main');
const Files = require('./files');

const DEPENDENCIES_MOCK = require('./mocks/expected_dependencies_result').module;
const SOURCE_CODE_LIST_FILE_PATH = "src/mocks/CHANGED.txt";

const main = new Main();

describe("Test dependencies builder", () => {

    it("should successfully build module dependencies from source list", async () => {
        const source_list = (await Files.readFile(SOURCE_CODE_LIST_FILE_PATH)).split('\n');
        const dependencies = await main.source_code_list_to_modules_and_dependencies(source_list);
        expect(dependencies).toEqual(DEPENDENCIES_MOCK);
    });

    it("should get the right module name with empty dependencies from source path", async () => {
        const source_list = (await Files.readFile(SOURCE_CODE_LIST_FILE_PATH)).split('\n');
        expect(await main.source_code_path_to_module(source_list[0])).toEqual({
            module_name: "alice",
            dependencies: []
        });
    });

    it("should get the right module name with dependencies from source path", async () => {
        const source_list = (await Files.readFile(SOURCE_CODE_LIST_FILE_PATH)).split('\n');
        expect(await main.source_code_path_to_module(source_list[1])).toEqual({
            module_name: "bob",
            dependencies: ["alice", "charlie"]
        });
    });

    it("should find module in source path", async () => {
        expect(await main.isPathContainModule("src/project/alice/")).toBeTruthy()
    });

    it("should not find module in source path", async () => {
        expect(await main.isPathContainModule("src/project/alice/Dockerfile")).toBeFalsy()
    });

    it("should fetch modules list from source path", async () => {
        expect(await main.fetchDependenciesFromModulefile("src/project/bob")).toEqual(["alice", "charlie"])
    });

    it("should fetch empty modules list from source path", async () => {
        expect(await main.fetchDependenciesFromModulefile("src/project/alice")).toEqual([])
    });

});

