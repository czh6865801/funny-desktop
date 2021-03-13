'use strict'

const { exec } = require('child_process')
const platform = require('process').platform

//启动前杀死所有node进程。防止端口占用
if (platform !== 'win32') {
  exec('kill -9 lsof -t -i: 9080', (error) => {
    console.error(error)
  })
} else {
  var a = exec('netstat -ano | findstr 9080')
  a.stdout.on('data', (stdout) => {
    let b = stdout.split('  ').pop().split('')
    let c = []
    for (let index = 0; index < b.length; index++) {
      if (/^\d+$/.test(b[index])) {
        c.push(b[index])
      }
    }
    exec(`taskkill /pid ${c.join('')} -t -f`)
  })
}
















