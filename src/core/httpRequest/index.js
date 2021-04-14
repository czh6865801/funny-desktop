const { net } = require('electron')
const util = require('util')

module.exports = {
  requestGet(options = {}) {
    return new Promise((resolve, reject) => {
      const request = net.request(Object.assign({
        method: 'GET',
        timeout: 1,
      }, options))
      request.on('response', (response) => {
        response.on('data', (data) => {
          if (util.types.isUint8Array(data)) {
            resolve(`${data}`)
          } else {
            resolve(data)
          }
        })
      })
      request.end()
    })
  }
}
