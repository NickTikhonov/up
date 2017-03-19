"use strict"

const path = require("path")

const request = require("request")

const errors = require("../errors.js")

function genRequestJson(filePath) {
  var fileContent = fs.readFileSync(filePath, 'utf-8')
  var reqJson = {
    description: "Uploaded using up (https://github.com/NickTikhonov/up)",
    public:false,
    files: {}
  }

  reqJson.files[path.basename(filePath)] = {content: fileContent}

  return reqJson
}

function upload(path) {
  return new Promise(function(resolve, reject) {

    request.post({
        url:"https://api.github.com/gists",
        headers: {
          "User-Agent": "up v0.1"
        },
        json: genRequestJson(path)
      },
      function (err, response, body) {
        if(err) {
          reject(errors.UNKNOWN_ERROR)
        }
        else {
          resolve(body.html_url)
        }
      })
  })
}

module.exports = upload
