"use strict"

const gistUp = require("./gist")

function upload(path) {
  return gistUp(path)
  .then(function (url) {
    var gistId = url.split("/").slice(-1)[0]
    return `https://play.rust-lang.org/?gist=${gistId}&version=stable&backtrace=0`
  })
}

module.exports = upload
