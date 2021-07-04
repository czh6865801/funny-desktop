const needle = require('needle')

needle.defaults({
  open_timeout: 10000
})

module.exports = {
  getData(option) {
    console.debug(option.url, option.qs)
    option.headers = Object.assign({}, option.headers, {
      accessToken: this.accessToken || ''
    })
    return needle('get',
      option.url,
      option.qs,
      Object.assign(option, {
        rejectUnauthorized: false,
        open_timeout: option.open_timeout || 10000
      }
      )).then(response => {
        console.debug('request respond for %s', option.url, response)
        return response
      })
  }
}



