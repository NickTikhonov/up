#!/usr/bin/env node
var program = require("commander")

program
  .arguments('<file>')
  .action(function(file) {
    console.log(file)
  })
  .parse(process.argv)
