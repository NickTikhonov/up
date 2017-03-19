var fs = require("fs")
var path = require("path")

var prompt = require("prompt")
var errors = require("./errors.js")

function getOptions() {
  return new Promise(function(resolve, reject) {
    if (optionsFileExists()) {
      readOptionsFile().then(resolve).catch(reject)
    } else {
      createOptionsThroughUserEntry().then(writeToOptionsFile).then(resolve).catch(reject)
    }
  })
}

var defaultConfig = {
  auth: {
    "dropbox": {
      accessToken: "sjdkflksjdflksdlfkjlsdkj"
    }
  }
}

var HOME = process.env.HOME || process.env.USERPROFILE
var OPTIONS_FILE = path.join(HOME, ".up.json")

function createOptionsThroughUserEntry() {
  return new Promise(function(resolve, reject) {
    fs.readFile(
      path.join(
        __dirname,
        "..", "res",
        "prompts",
        "dropboxAuthPrompt.txt"
      ),
      "utf-8",
      function(err, dropboxPrompt) {
        if (err) {
          reject(err)
        } else {
          console.log(dropboxPrompt)
          prompt.get(['accessToken'], function(err, result) {
            if (err) {
              reject(errors.UNKNOWN_ERROR)
            } else {
              resolve({
                auth: {
                  dropbox: {
                    accessToken: result.accessToken
                  }
                }
              })
            }
          })
      }
    })
  })
}

function optionsFileExists() {
  return fs.existsSync(OPTIONS_FILE) && fs.lstatSync(OPTIONS_FILE).isFile()
}

function writeToOptionsFile(options) {
  return new Promise(function(resolve, reject) {
    fs.writeFile(OPTIONS_FILE, JSON.stringify(options, null, 2), function(err) {
      if (err) {
        reject(err)
      } else {
        resolve(options)
      }
    })
  })
}

function readOptionsFile() {
  return new Promise(function(resolve, reject) {
    fs.readFile(OPTIONS_FILE, 'utf8', function(err, data) {
      if (err) {
        reject(errors.UNKNOWN_ERROR)
      } else {
        try {
          var options = JSON.parse(data)
          resolve(options)
        } catch (err2) {
          reject(errors.OPTIONS_BAD_FORMAT)
        }
      }
    })
  });
}

module.exports = getOptions
