var fs = require("fs")
var path = require("path")

var prompt = require("prompt")
var errors = require("./errors.js")

var dropboxPrompt = `
This is the first time you run this script, please follow the instructions:

1) Open the following URL in your Browser, and log in using your account: https://www.dropbox.com/developers/apps
2) Click on "Create App", then select "Dropbox API app"
3) Now go on with the configuration, choosing the app permissions and access restrictions to your DropBox folder
4) Enter the "App Name" that you prefer (e.g. MyUploader127241198714600)

Now, click on the "Create App" button.

When your new App is successfully created, please click on the Generate button
under the 'Generated access token' section, then copy and paste the new access token here:
`

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
