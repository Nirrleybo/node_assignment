const Main = require('./main');
const Files = require('./files');
const expected_dependencies_result_mock = require('./mocks/expected_dependencies_result').module;

const SOURCE_CODE_LIST_FILE_PATH = "node_app/mocks/CHANGED.txt";
const main = new Main();

describe("Test dependencies builder", () => {
    
    it("should successfully build module dependencies from source list", async () => {
        const source_list = (await Files.readFile(SOURCE_CODE_LIST_FILE_PATH)).split('\n');
        const dependencies = await main.source_code_list_to_modules_and_dependencies(source_list);
        expect(dependencies).toEqual(expected_dependencies_result_mock);
    });

    // it("should get the right module name and dependencies from source path", () => {
    //     expect(main.source_code_path_to_module("")).toEqual({
    //         module_name: "bob",
    //         dependencies: []
    //     });
    // });

});

