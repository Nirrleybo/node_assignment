# Dependencies Builder Assignment

## Requirements

`Nodejs`: 12.16.1  
`npm`: 6.13.4

```sh
# Set node
nvm use 12.16

# Install
npm i

# Test
npm run test
```

## Run locally

### Defaults params set to:  
`changed_file_path`: "CHANGED.txt"  
`project_path`: "sample-project"
```sh
# Run with params:
node index.js changed_file_path=CHANGED.txt project_path=sample-project
```

## Docker

```sh
# Build
docker build -t test-code .

# Run from current location
docker run --rm \
-e PROJECT_PATH="src/mocks/project" \
-e CHANGED_FILE_PATH="src/mocks/CHANGED.txt" \
-v $PWD:/app \
test-code

# Run with custom volume path
docker run --rm \
-e PROJECT_PATH="/project" \
-e CHANGED_FILE_PATH="/project/CHANGED.txt" \
-v /Users/nir/giffgaff/auto-ecr/sample-project:/project \
test-code
```