# Dependencies Builder Assignment

## Requirements

`Nodejs`: >= 12.16  
`npm`: >= 6.14

## Setup
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

# Run
docker run --rm \
-e PROJECT_PATH="src/mocks/project" \
-e CHANGED_FILE_PATH="src/mocks/CHANGED.txt" \
-v $PWD:/app \
test-code
```

### Additional running options
```sh
# Run from current location (option 2)
docker run --rm \
-e PROJECT_PATH="sample-project" \
-e CHANGED_FILE_PATH="CHANGED.txt" \
-v $PWD:/app \
test-code

# Run with remote volume path
docker run --rm \
-e PROJECT_PATH="/project" \
-e CHANGED_FILE_PATH="/project/CHANGED.txt" \
-v /pat/to/project:/app/project \
test-code

# Run in interactive mode
docker run --rm \
-e PROJECT_PATH="/project" \         
-e CHANGED_FILE_PATH="/project/CHANGED.txt" \ 
-v /pat/to/project:/app/project \
-it test-code /bin/bash
```