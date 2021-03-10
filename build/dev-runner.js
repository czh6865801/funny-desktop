'use strict'

const { exec } = require('child_process')

// kill -9 
exec('pgrep node.exe | xargs ps -u --pid',(error, stdout, stderr)=>{
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
})













