#!/usr/bin/env node
"use strict"

var fs = require("fs")

var program = require("commander")
var tmp = require("tmp")

var upload = require("./src/uploader")
var getOptions = require("./src/options")
var pathIsSource = require("./src/fileType")

program
  .arguments("<file..>")
  .parse(process.argv)

getOptions()
  .then(function(options) {
    if (noArgs()) {
      handlePipeInputUpload(options)
    } else {
      handleArgUpload(options)
    }
  })
  .catch(function(err) {
    console.log(err)
  })


function handleArgUpload(options) {
  var filePaths = program.args

  filePaths.forEach(function(path) {
    if (!validPath(path)) {
      console.error("path: " + path + " is not valid. exiting.")
      process.exit(1)
    }
  })


  var uploads = []
  filePaths.forEach(function(path) {
    uploads.push(new Promise(function(resolve, reject) {
      pathIsSource(path).then(function(isSource) {
        var provider = isSource ? "gist" : "dropbox"
        upload(path, provider, options).then(resolve).catch(reject)
      }).catch(reject)
    }))
  })
  Promise.all(uploads)
  .then(function (urls) {
    urls.forEach(function(url) {
      console.log(url)
    })
  })
}

function handlePipeInputUpload(options) {
  tmp.file(function(err, path, fd, cleanup) {
    if (err) {
      console.log(err)
      process.exit(1)
    }

    writeInputToFile(path)
      .then(function() {
        return upload(path, "dropbox", options)
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
