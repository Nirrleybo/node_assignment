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

# Run
```