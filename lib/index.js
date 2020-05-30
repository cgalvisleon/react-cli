#!/usr/bin/env node
'use strict';

var args = require('args');
var fs = require('fs');
var mkdirp = require('mkdirp');

args.option('function', 'Schematic type component function').option('component', 'Schematic type component').option('name', 'name of schematic').command('generate', 'Generate files based on a schematic', generate());

function schemeFunction(name) {
  return 'import React from "react";\n  \n  function ' + name + '(props) {\n    return (\n      <React.Fragment>\n        <div>' + name + '</div>\n      </React.Fragment>\n    );\n  }  \n  \nexport default ' + name + ';\n';
}

function schemeComponent(name) {
  return 'import React from "react";\n\nclass ' + name + ' extends React.Component {\n  constructor(props){\n    super(props);\n  }\n  \n  render() {\n    return (\n      <React.Fragment>\n        <div>' + name + '</div>\n      </React.Fragment>\n    );\n  }\n}\n\nexport default ' + name + '; \n';
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
  var result = {
    name: '',
    path: ''
  };
  if (value.length > 0) {
    var path = value.split('.');
    path = path[0];
    path = path.split('/');
    var n = path.length;
    path.forEach(function (elemento, indice, array) {
      if (indice + 1 === n) {
        result.name = elemento;
      } else if (result.path === '') {
        result.path = elemento;
      } else {
        result.path = result.path + '/' + elemento;
      }
    });
  }
  return result;
}

function writeFile(file, content) {
  var name = file.path + '/' + file.name;
  if (!fileExists(name)) {
    fs.writeFile(name + '.js', content, 'utf8', function (err) {
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
    var path = './src/' + file.path;
    if (!fileExists(path)) {
      mkdirp(path).then(function () {
        file.path = path;
        writeFile(file, content);
      }).catch(function (err) {
        return false;
      });
    }
  } else {
    file.path = './src';
    writeFile(file, content);
  }
}

function generate() {
  var flags = args.parse(process.argv);
  var content = '';
  var file = {};
  if (flags['c']) {
    var fileName = flags['c'];
    file = getFilename(fileName);
    var name = file.name.charAt(0).toUpperCase() + file.name.slice(1);
    content = schemeComponent(name);
    createFilename(file, content);
  } else if (flags['f']) {
    var _fileName = flags['f'];
    file = getFilename(_fileName);
    var _name = file.name.charAt(0).toUpperCase() + file.name.slice(1);
    content = schemeFunction(_name);
    createFilename(file, content);
  }
}