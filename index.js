#!/usr/bin/env node
"use strict"

var fs = require("fs")
var program = require("commander")
var tmp = require("tmp")

program
  .arguments("<file..>")
  .parse(process.argv)

if (program.args.length === 0) {
  tmp.file(function(err, path, fd, cleanup) {
    if (err) {
      console.log(err)
    }

    writeInputToFile(path)
      .then(function() {
        //TODO: upload here
      })
      .catch(function(err) {
        //TODO: die here
        console.log(err)
      })
  })
} else {
  program.args.forEach(function(path) {
    if (!validPath(path)) {
      //TODO: die here
    }

    //TODO: upload here
  })
}

function validPath(path) {
  if (fs.existsSync(path)) {
    var stats = fs.lstatSync(path)
    if (stats.isFile()) {
      return true
    }
  }

  return false
}

function writeInputToFile(filePath) {
  return new Promise(function(resolve, reject) {
    var streamData = ""

    process.stdin.resume();
    process.stdin.on('data', function(buf) {
      streamData += buf.toString();
    });

    process.stdin.on('end', function() {
      fs.writeFile(filePath, streamData, function(err) {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    });
  })
}
