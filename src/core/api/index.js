import { ipcRenderer } from 'electron'

export default {
  getdata() {
    return ipcRenderer.invoke('httpRequest-requestGet', {
      url: 'https://chp.shadiao.app/api.php'
    })
  },
}
