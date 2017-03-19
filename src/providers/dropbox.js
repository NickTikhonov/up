"use strict"

const fs = require("fs")
const path = require("path")

const Dropbox = require("dropbox")
const md5 = require("md5")

const errors = require("./errors.js")

function getKey() {
  return process.env.UP_DROPBOX_KEY
}

function genName(filePath) {
  let nonce = md5(new Date().toISOString()).substr(-10)
  return `/${nonce}_${path.basename(filePath)}`
}

function upload(filePath) {
  return new Promise(function(resolve, reject) {
    if(!getKey()) {
      reject(errors.NO_SECRET)
    } else {
      let dbx = new Dropbox({
        accessToken: getKey()
      })

      dbx.filesUpload({
        path: genName(filePath),
        contents: fs.readFileSync(filePath)
      }).then(function(response) {
        return dbx.sharingCreateSharedLink({
          path: response.path_lower,
          short_url:true
        })
      })
      .then(resolve)
      .catch(function(err) {
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
