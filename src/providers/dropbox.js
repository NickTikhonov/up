"use strict"

const fs = require("fs")
const path = require("path")

const Dropbox = require("dropbox")
const md5 = require("md5")

const errors = require("../errors.js")

function upload(filePath, authOptions) {
  return new Promise(function(resolve, reject) {
    if(!authOptions.accessToken) {
      reject(errors.NO_SECRET)
    } else {
      let dbx = new Dropbox({
        accessToken: authOptions.accessToken
      })

      dbx.filesUpload({
        path: path.join("/", filePath),
        contents: fs.readFileSync(filePath),
        autorename:true
      }).then(function(response) {
        return dbx.sharingCreateSharedLink({
          path: response.path_lower,
          short_url:true
        })
      })
      .then(function(result) {resolve(result.url)})
      .catch(function(err) {
        console.log(err);
        let actualError = JSON.parse(err.error)
        if(actualError.error.reason[".tag"] == "conflict") {
          reject(errors.FILE_UPLOAD_CONFLICT)
        } else {
          reject(errors.UNKNOWN_ERROR)
        }
      })
    }
  })
}

module.exports = upload
