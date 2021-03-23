'use strict'

let YELLOW = '\x1b[33m'
let END = '\x1b[0m'
const { exec } = require('child_process')
const platform = require('process').platform

const format = (name, data, color) => {
  return color + name + END +
    '  ' + // Two space offset
    data.toString().trim() +
    '\n'
}
const run = (command, color, name) => {
  console.log(command, color, name)
  let child = exec(command)
  child.stdout.on('data', data => console.log(format(name, data, color)))
  child.stderr.on('data', data => console.error(data))
}

//启动前杀死所有node进程。防止端口占用
if (platform !== 'win32') {
  exec('kill -9 lsof -t -i: 9080', (error) => {
    console.error(error)
  })
} else {
  var a = exec('netstat -ano | findstr 9080')
  a.stdout.on('data', function (stdout) {
    let b = stdout.split('  ')
    for (let index = 0; index < b.length; index++) {
      if (/(\r\n)/g.test(b[index])) {
        const pid = (b[index].replace(/(\r\n)/g, '')).trim()
        console.log(pid)
        exec(`taskkill /pid ${pid} -t -f`)
      }
    }
  })
}

console.log(`${YELLOW}Starting webpack serve...\n${END}`)
run('webpack serve --config ./build/webpack.dev.js', YELLOW, 'webpack')