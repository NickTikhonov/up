#!/usr/bin/env node
var program = require("commander")

program
  .arguments('<file..>')
  .parse(process.argv)

if (program.args.length === 0) {
  console.error("please provide at least one <file> argument.")
}
