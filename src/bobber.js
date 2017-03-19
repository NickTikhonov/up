"use strict"


var hasUnicode = require("has-unicode")

class Bobber {
  constructor() {
    if(hasUnicode()) {
      this.ANIMATION = [
        "(✈☁☁☁☁☁☁☁☁☁)",
        "(☁✈☁☁☁☁☁☁☁☁)",
        "(☁☁✈☁☁☁☁☁☁☁)",
        "(☁☁☁✈☁☁☁☁☁☁)",
        "(☁☁☁☁✈☁☁☁☁☁)",
        "(☁☁☁☁☁✈☁☁☁☁)",
        "(☁☁☁☁☁☁✈☁☁☁)",
        "(☁☁☁☁☁☁☁✈☁☁)",
        "(☁☁☁☁☁☁☁☁✈☁)",
        "(☁☁☁☁☁☁☁☁☁✈)",
        // "(--------✈-)",
        // "(-------✈--)",
        // "(------✈---)",
        // "(-----✈----)",
        // "(----✈-----)",
        // "(---✈------)",
        // "(--✈-------)",
        // "(-✈--------)",
        // "(✈---------)",
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
    // console.log("Bobbing");
    process.stdout.cursorTo(0)
    process.stdout.write(this.ANIMATION[this.frameIdx])
    this.frameIdx = (this.frameIdx + 1) % this.ANIMATION.length
  }

  start() {
    process.stdout.write("\x1b[34m")
    this.interval = setInterval(() => this.bob(), 100)
  }

  stop() {
    process.stdout.clearLine()
    process.stdout.cursorTo(0)
    process.stdout.write("\x1b[0m")
    clearInterval(this.interval)
  }
}

module.exports = Bobber
