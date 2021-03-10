'use strict'

const { exec } = require('child_process')
const platform = require('process').platform

//启动前杀死所有node进程。防止端口占用
if (platform !== 'win32') {
  exec('kill -9 `lsof -t -i: ' + port +'`',(error)=>{
    console.error(error)
  })
} else {
  exec('tskill node',(error)=>{
    console.error(error)
  })  
}














