"use strict"

const providers = require("./providers")
const errors = require("./errors.js")

function upload(path, provider) {
    if(provider in providers) {
        return providers[provider](path)
    }
    else {
        return Promise.reject(errors.PROVIDER_NOT_FOUND)
    }
}

module.exports = upload
