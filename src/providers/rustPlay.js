"use strict"

import gistUp from "./gist"

export default async function upload(path) {
  const url = await gistUp(path)
  const gistId = url.split("/").slice(-1)[0]
  return `https://play.rust-lang.org/?gist=${gistId}&version=stable&backtrace=0`
}
