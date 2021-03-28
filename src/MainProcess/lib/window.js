const { BrowserWindow } = require("electron")
const isWin = process.platform === 'win32'
const isDebug = process.env.NODE_ENV === 'development'
let WinOptions = {
  width: 500,
  height: 500,
  center: true, //窗口在屏幕居中
  frame: !isWin, //无边框窗口  随之会取消菜单栏
  // titleBarStyle: 'hiddenInset',  //隐藏导航栏
  // autoHideMenuBar: true, //自动隐藏菜单栏，除非按下Alt键
  backgroundColor: '#fff',
  // 设置网页的功能
  webPreferences: {
    nodeIntegration: true,
    contextIsolation: false
  }
}

module.exports = {
  indexUrl: isDebug ? 'http://localhost:9080/index.html' : `file://${__dirname}/index.html`,
  init() {
    let BW = new BrowserWindow(WinOptions)
    BW.loadURL(this.indexUrl)
    if (isDebug) {
      // 打开开发者工具
      BW.webContents.openDevTools()
    }
  }
}