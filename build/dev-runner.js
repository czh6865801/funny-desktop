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
}

console.log(`${YELLOW}Starting webpack serve...\n${END}`)
run('webpack serve --config ./build/webpack.dev.js',YELLOW,'webpack')





