const Main = require('./main');
const Files = require('./files');
const expected_dependencies_result_mock = require('./mocks/expected_dependencies_result');

const SOURCE_CODE_LIST_FILE_PATH = "mocks/CHANGED.txt"
const source_list = Files.readFile(SOURCE_CODE_LIST_FILE_PATH);

describe("Test dependencies builder", () => {

    it("should successfully build module dependencies from source list", () => {
        expect(Main.source_code_list_to_modules_and_dependencies(source_list)).toEqual(expected_dependencies_result_mock);
    });

    it("should get the right module name and dependencies from source path", () => {
        expect(Main.source_code_path_to_module("")).toEqual({
            module_name: "bob",
            dependencies: []
        });
    });

});

