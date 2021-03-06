#!/usr/bin/env node
const args = require('args');
const fs = require('fs');
const mkdirp = require('mkdirp');

args.option('function', 'Schematic type component function').option('component', 'Schematic type component').option('name', 'name of schematic').command('generate', 'Generate files based on a schematic', generate());

function schemeFunction(name) {
  return `import React from "react";
  
  function ${name}(props) {
    return (
      <React.Fragment>
        <div>${name}</div>
      </React.Fragment>
    );
  }  
  
export default ${name};
`;
}

function schemeComponent(name) {
  return `import React from "react";

class ${name} extends React.Component {
  constructor(props){
    super(props);
  }
  
  render() {
    return (
      <React.Fragment>
        <div>${name}</div>
      </React.Fragment>
    );
  }
}

export default ${name}; 
`;
}

function fileExists(path) {
  try {
    if (fs.accessSync(path)) {
      return true;
    }
  } catch (e) {
    return false;
  }
}

function getFilename(value) {
  let result = {
    name: '',
    path: '',
  };
  if (value.length > 0) {
    let path = value.split('.');
    path = path[0];
    path = path.split('/');
    const n = path.length;
    path.forEach(function (elemento, indice, array) {
      if (indice + 1 === n) {
        result.name = elemento;
      } else if (result.path === '') {
        result.path = elemento;
      } else {
        result.path = `${result.path}/${elemento}`;
      }
    });
  }
  return result;
}

function writeFile(file, content) {
  const name = `${file.path}/${file.name}`;
  if (!fileExists(name)) {
    fs.writeFile(`${name}.js`, content, 'utf8', (err) => {
      if (err) {
        console.log('Error writing file', err);
      } else {
        console.log('Successfully write file');
      }
    });
  }
}

function createFilename(file, content) {
  if (file.path.length > 0) {
    const path = `./src/${file.path}`;
    if (!fileExists(path)) {
      mkdirp(path)
        .then(() => {
          file.path = path;
          writeFile(file, content);
        })
        .catch((err) => {
          return false;
        });
    }
  } else {
    file.path = './src';
    writeFile(file, content);
  }
}

function generate() {
  const flags = args.parse(process.argv);
  let content = '';
  let file = {};
  if (flags['c']) {
    const fileName = flags['c'];
    file = getFilename(fileName);
    const name = file.name.charAt(0).toUpperCase() + file.name.slice(1);
    content = schemeComponent(name);
    createFilename(file, content);
  } else if (flags['f']) {
    const fileName = flags['f'];
    file = getFilename(fileName);
    const name = file.name.charAt(0).toUpperCase() + file.name.slice(1);
    content = schemeFunction(name);
    createFilename(file, content);
  }
}
