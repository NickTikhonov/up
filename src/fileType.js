var fs = require("fs")
var path = require("path")

function pathIsSource(filePath) {
  return new Promise(function(resolve, reject) {
    var ext = path.extname(filePath)
    if (ext.length === 0) {
      resolve(false)
    } else {
      ext = ext.slice(1)

      fs.readFile(path.join(__dirname, "..", "res", "extensions.txt"), "utf-8", function(err, data) {
        if (err) {
          reject(err)
        } else {
          var bank = data.split("\n")
          resolve(bank.indexOf(ext) !== -1)
        }
      })
    }
  })
}

module.exports = pathIsSource
