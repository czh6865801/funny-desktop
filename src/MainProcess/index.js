const { app, BrowserWindow, Menu } = require("electron");
const path = require('path')
const isWindows = process.platform === 'win32'

// https://zhuanlan.zhihu.com/p/138128748  好文章

function createWindow () {
  // 创建浏览器窗口 https://www.electronjs.org/docs/api/browser-window#%E8%AE%BE%E7%BD%AE-backgroundcolor
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    center: true, //窗口在屏幕居中
    frame: false, //无边框窗口  随之会取消菜单栏
    // titleBarStyle: 'hiddenInset',  //隐藏导航栏
    // autoHideMenuBar: true, //自动隐藏菜单栏，除非按下Alt键
    backgroundColor: '#fff',
    // 设置网页的功能
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, '../Plugin/preload.js'),
      // 注释以下两个键值对会报警告  https://github.com/electron/electron/issues/24950
      contextIsolation: true,
      worldSafeExecuteJavaScript: true
    }
  })
  // Menu.setApplicationMenu(null) //取消菜单栏
  // 加载index.html文件 loadURL() 和  loadFile()  的区别
  // let url = require('url').format({
  //   protocol: 'file',
  //   slashes: true,
  //   // 需要使用绝对路径
  //   pathname: '/src/RendererProcess/htmlFile/login.html'
  // })

  // win.loadURL(url)
  win.loadFile('../RendererProcess/htmlFile/login.html')
  // 打开开发者工具
  win.webContents.openDevTools()
}

app.on('ready', createWindow)

//当所有窗口都被关闭后退出
app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时，
  // 通常在应用程序中重新创建一个窗口。
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// 您可以把应用程序其他的流程写在在此文件中
// 代码 也可以拆分成几个文件，然后用 require 导入。









