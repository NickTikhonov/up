"use strict"


var hasUnicode = require("has-unicode")

class Bobber {
  constructor() {
    if(hasUnicode()) {
      this.ANIMATION = [
        "(⬆---------)",
        "(-⬆--------)",
        "(--⬆-------)",
        "(---⬆------)",
        "(----⬆-----)",
        "(-----⬆----)",
        "(------⬆---)",
        "(-------⬆--)",
        "(--------⬆-)",
        "(---------⬆)",
        "(--------⬆-)",
        "(-------⬆--)",
        "(------⬆---)",
        "(-----⬆----)",
        "(----⬆-----)",
        "(---⬆------)",
        "(--⬆-------)",
        "(-⬆--------)",
        "(⬆---------)",
      ]
    }
    else {
      this.ANIMATION = [
        "(*---------)",
        "(-*--------)",
        "(--*-------)",
        "(---*------)",
        "(----*-----)",
        "(-----*----)",
        "(------*---)",
        "(-------*--)",
        "(--------*-)",
        "(---------*)",
        "(--------*-)",
        "(-------*--)",
        "(------*---)",
        "(-----*----)",
        "(----*-----)",
        "(---*------)",
        "(--*-------)",
        "(-*--------)",
        "(*---------)",
      ]
    }
    this.frameIdx = 0
  }

  bob() {
    process.stdout.cursorTo(0)
    process.stdout.write(this.ANIMATION[this.frameIdx])
    this.frameIdx = (this.frameIdx + 1) % this.ANIMATION.length
  }

  start() {
    if (process.stdout) {
      process.stdout.write("\x1b[34m")
      this.interval = setInterval(() => this.bob(), 50)
    }
  }

  stop() {
    if (process.stdout) {
      process.stdout.clearLine()
      process.stdout.cursorTo(0)
      process.stdout.write("\x1b[0m")
      clearInterval(this.interval)
    }
  }
}

module.exports = Bobber
