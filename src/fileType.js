import fs from "fs"
import path from "path"

export default async function pathIsSource(filePath) {
  var ext = path.extname(filePath)
  if (ext.length === 0) {
    return false
  } else {
    ext = ext.slice(1)

    let data = await new Promise((resolve, reject) =>
      fs.readFile(path.join(__dirname, "..", "res", "extensions.txt"), "utf-8", function(err, data) {
        return err ? reject(err) : resolve(data)
      })
    )

    let bank = data.split("\n")
    return bank.indexOf(ext) !== -1
  }
}
