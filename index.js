#!/usr/bin/env node
"use strict"

var fs = require("fs")
var program = require("commander")
var tmp = require("tmp")

var uploader = require("./src/uploader.js")

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
          uploader(path, "Dropbox")
          .then(console.log)
          .catch(console.error)
      })
      .catch(function(err) {
        //TODO: die here
        console.log(err)
      })
  })
} else {
  var uploads = []
  program.args.forEach(function(path) {
    if (!validPath(path)) {
      process.exit(1)
    }
    else {
      uploads.push(uploader(path, "Dropbox"))
    }
  })
  Promise.all(uploads)
  .then(function (urls) {
    urls.forEach(function(url) {
      console.log(url)
    })
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
