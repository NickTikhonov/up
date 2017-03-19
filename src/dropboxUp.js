"use strict"

const Dropbox = require("dropbox")
const fs = require("fs")
const path = require("path")
const md5 = require("md5")

/**
    Uploads a file onto Dropbox
    @TODO Improve comments before v1.0

    @param {string} filePath - the file to be uploaded. This assumes this is a valid path.
    @throws {Error} - if the UP_DROPBOX_KEY enviroment variable is not set
*/
function uploadFile(filePath) {
    return new Promise(function(resolve, reject) {
        if(!process.env.UP_DROPBOX_KEY) {
            reject("Api key not found: please define the UP_DROPBOX_KEY env var")
        }
        else {
            let dbx = new Dropbox({ accessToken: process.env.UP_DROPBOX_KEY})

            let uniqueHash = md5(new Date().toISOString()).substr(-10)

            dbx.filesUpload({path: `/${uniqueHash}_${path.basename(filePath)}`, contents: fs.readFileSync(filePath)})
            .then(function(response) {
                dbx.sharingCreateSharedLink({path: response.path_lower, short_url:true})
                .then(function(response) {
                    resolve(response.url)
                })
                .catch(function(error) {
                    reject("Something broke while retriving the share link: " + JSON.stringify(error))
                })
            })
            .catch(function(error) {
                reject("Something broke while uploading to Dropbox: " + JSON.stringify(error))
            })
        }
    })
}

module.exports = uploadFile
