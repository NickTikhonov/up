#!/usr/bin/env node
"use strict"

var fs = require("fs")

var program = require("commander")
var tmp = require("tmp")

var upload = require("./src/uploader")
var getOptions = require("./src/options")
var pathIsSource = require("./src/fileType")
var Bobber = require("./src/bobber")

program
  .option("-p, --provider <provider>", "The name of the provider")
  .arguments("<file..>")
  .parse(process.argv)

getOptions()
  .then(function(options) {
    if (noArgs()) {
      handlePipeInputUpload(options, program.provider)
    } else {
      handleArgUpload(options, program.provider)
    }
  })
  .catch(function(err) {
    console.log(err)
  })


function handleArgUpload(options, forcedProvider) {
  var filePaths = program.args

  filePaths.forEach(function(path) {
    if (!validPath(path)) {
      console.error("path: " + path + " is not valid. exiting.")
      process.exit(1)
    }
  })

  var bob = new Bobber()
  bob.start()

  var uploads = []
  filePaths.forEach(function(path) {
    uploads.push(new Promise(function(resolve, reject) {
      if(forcedProvider) {
        upload(path, forcedProvider, options).then(resolve).catch(reject)
      }
      else {
        pathIsSource(path).then(function(isSource) {
          var provider = isSource ? "gist" : "dropbox"
          upload(path, provider, options).then(resolve).catch(reject)
        }).catch(reject)
      }
    }))
  })
  Promise.all(uploads)
  .then(function (urls) {
    bob.stop()
    urls.forEach(function(url) {
      console.log(url)
    })
  })
  .catch(function (err) {
    bob.stop();
    console.log(err)
  })
}

function handlePipeInputUpload(options) {
  tmp.file({
    postfix: '.txt'
  }, function(err, path, fd, cleanup) {
    if (err) {
      console.log(err)
      process.exit(1)
    }
    var provider = "dropbox"
    if(program.provider) {
      provider = program.provider
    }

    var bob = new Bobber()

    writeInputToFile(path)
      .then(function() {
        bob.start()
        return upload(path, provider, options)
      })
      .then(function(url) {
        bob.stop()
        console.log(url)
      })
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
