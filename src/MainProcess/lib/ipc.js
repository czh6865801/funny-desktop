const { ipcMain } = require('electron')
const httpRequest = require('../../core/httpRequest')


module.exports = {
  init() {
    ipcMain.handle('httpRequest-requestGet', async (event, arg) => {
      const result = await httpRequest.requestGet(arg)
      return result
    })
  }
}


