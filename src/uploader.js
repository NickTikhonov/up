"use strict"

const dropboxUp = require("./dropboxUp.js")
const errors = require("./errors.js")

const PROVIDERS = {
    "Dropbox":dropboxUp
}

function upload(path, provider) {
    if(provider in PROVIDERS) {
        return PROVIDERS[provider](path)
    }
    else {
        return Promise.reject(errors.PROVIDER_NOT_FOUND)
    }
}

module.exports = upload
