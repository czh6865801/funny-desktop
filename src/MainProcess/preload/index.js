const { ipcMain } = require('electron')
const needle = require('needle')


window.init = async (arg)=> {
  const a = await needle('get',arg.url)
  return a
}
console.log(window)
