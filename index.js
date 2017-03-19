#!/usr/bin/env node
"use strict"

var fs = require("fs")

var program = require("commander")
var tmp = require("tmp")

var upload = require("./src/uploader.js")

program
  .arguments("<file..>")
  .parse(process.argv)

if (noArgs()) {
  handlePipeInputUpload()
} else {
  handleArgUpload()
}

function handleArgUpload() {
  var filePaths = program.args

  filePaths.forEach(function(path) {
    if (!validPath(path)) {
      console.error("path: " + path + " is not valid. exiting.")
      process.exit(1)
    }
  })

  var uploads = []
  filePaths.forEach(function(path) {
    uploads.push(upload(path, "dropbox"))
  })
  Promise.all(uploads)
  .then(function (urls) {
    urls.forEach(function(url) {
      console.log(url)
    })
  })
}

function handlePipeInputUpload() {
  tmp.file(function(err, path, fd, cleanup) {
    if (err) {
      console.log(err)
      process.exit(1)
    }

    writeInputToFile(path)
      .then(function() {
        return upload(path, "Dropbox")
      })
      .then(console.log)
      .catch(function(err) {
        console.log(err)
      })
  })
}

function noArgs() {
  return program.args.length === 0
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
