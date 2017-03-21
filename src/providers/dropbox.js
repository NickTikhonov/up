"use strict"

const fs = require("fs")
const path = require("path")

const Dropbox = require("dropbox")
const md5 = require("md5")

const errors = require("../errors.js")

export default async function upload(filePath, authOptions) {
  if(!authOptions.accessToken) {
    throw errors.NO_SECRET
  }

  let dbx = new Dropbox({
    accessToken: authOptions.accessToken
  })

  let data = await new Promise((resolve,reject) =>
    fs.readFile(filePath, (err, data) => err ? reject(err) : resolve(data))
  )

  try {
    let uploadResult = await dbx.filesUpload({
      path: path.join("/", filePath),
      contents: data,
      autorename:true
    })
    let sharingResult = await dbx.sharingCreateSharedLink({
      path: uploadResult.path_lower,
      short_url:true
    })
    return sharingResult.url
  } catch(err) {
    console.log(err);
    let actualError = JSON.parse(err.error)
    if(actualError.error.reason[".tag"] == "conflict") {
      reject(errors.FILE_UPLOAD_CONFLICT)
    } else {
      reject(errors.UNKNOWN_ERROR)
    }
  }
}
