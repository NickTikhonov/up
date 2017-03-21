
import hasUnicode from "has-unicode"

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
    process.stderr.cursorTo(0)
    process.stderr.write(this.ANIMATION[this.frameIdx])
    this.frameIdx = (this.frameIdx + 1) % this.ANIMATION.length
  }

  start() {
    if (process.stderr && process.stderr.isTTY) {
      process.stderr.write("\x1b[34m")
      this.interval = setInterval(() => this.bob(), 50)
    }
  }

  stop() {
    if (process.stderr && process.stderr.isTTY) {
      process.stderr.clearLine()
      process.stderr.cursorTo(0)
      process.stderr.write("\x1b[0m")
      clearInterval(this.interval)
    }
  }
}

module.exports = Bobber
