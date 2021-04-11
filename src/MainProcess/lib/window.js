const { BrowserWindow } = require("electron")
const isWin = process.platform === 'win32'
const isDebug = process.env.NODE_ENV === 'development'
let WinOptions = {
  width: 1000,
  height: 600,
  center: true, //窗口在屏幕居中
  frame: !isWin, //无边框窗口  随之会取消菜单栏
  titleBarStyle: !isWin && 'hidden',
  // trafficLightPosition: !isWin && {x:5,y:15},
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