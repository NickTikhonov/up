"use strict"

const transfer = require("transfer-sh")

function upload(path) {
  return transfer(path)
}

module.exports = upload
