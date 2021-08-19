const logger = {
  log(color, ...args) {
    console.log(color, ...args, this.colors.reset)
  },
  assert(cond, message) {
    if (!cond) this.warn(message)
  },
  error(...message) {
    console.log(`${this.colors.red}error${this.colors.reset}`, ...message)
  },
  info(...message) {
    console.log(`${this.colors.blue}info${this.colors.reset}`, ...message)
  },
  warn(...message) {
    console.log(`${this.colors.yellow}warn${this.colors.reset}`, ...message)
  },
  success(...message) {
    console.log(`${this.colors.green}success${this.colors.reset}`, ...message)
  },
  colors: {
    reset: '\033[0m',

    //text color

    black: '\033[30m',
    red: '\033[31m',
    green: '\033[32m',
    yellow: '\033[33m',
    blue: '\033[34m',
    magenta: '\033[35m',
    cyan: '\033[36m',
    white: '\033[37m',

    //background color

    blackBg: '\033[40m',
    redBg: '\033[41m',
    greenBg: '\033[42m',
    yellowBg: '\033[43m',
    blueBg: '\033[44m',
    magentaBg: '\033[45m',
    cyanBg: '\033[46m',
    whiteBg: '\033[47m'
  }
}
module.exports.logger = logger
