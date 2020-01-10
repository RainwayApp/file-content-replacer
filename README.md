# file-content-replacer

A simple Github Action that wraps the NPM package [replace-in-file](https://www.npmjs.com/package/replace-in-file).

## Usage

The sample workflow sets the assembly version based on a new Build Number

```yaml
name: Build

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v1

    - name: Get Build Number
      uses: einaregilsson/build-number@v2
      with:
        token: ${{secrets.github_token}}

    - name: Update project file
      uses: rshillington/find-content-replacer@master
      with:
        files: "**/*.csproj"
        from: "<AssemblyVersion>[0-9\.]+<\/AssemblyVersion>"
        to: "<AssemblyVersion>1.0.0.${{ env.BUILD_NUMBER}}</AssemblyVersion>"

```