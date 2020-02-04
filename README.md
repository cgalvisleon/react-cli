# Josephine React CLI

This package includes the global command for generate schematic file of component and component functional.

## Installation

npm install -g josephine

## Example Generate Component

```
josephine generate --component my-new-component
josephine g -c my-new-component # using the alias

# components support realtive path generation
# if in the directory src/app/components and you run

josephine g -c new-cmp

# your component will be generated in src/app/components/new-cmp.js
# but if you were to run

josephine g -c ./new-cmp

# your component will be generated in src/app/components/new-cmp.js
# if in the directory src/app

josephine g -c ./component/new-cmp

# and your component will be generated in src/app/components/new-cmp.js
```

## Example Generate Component Functional

```
josephine generate --function my-new-component
josephine g -f my-new-component # using the alias

# components support realtive path generation
# if in the directory src/app/components and you run

josephine g -f new-cmp

# your component will be generated in src/app/components/new-cmp.js
# but if you were to run

josephine g -f ./new-cmp

# your component will be generated in src/app/components/new-cmp.js
# if in the directory src/app

josephine g -f ./component/new-cmp

# and your component will be generated in src/app/components/new-cmp.js
```

## Help

josephine help
josephine -h

```
Commands:
    help     Display help
    version  Display version

Options:
    -c, --component  Schematic type component
    -f, --function   Schematic type component function
    -h, --help       Output usage information
    -n, --name       name of schematic
    -v, --version    Output the version number
```
