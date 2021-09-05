import React from "react"
import ReactDOM from "react-dom"
import App from '../components/app.js'

import('../theme/normal/index.js' ).then(({default: colors})=>{
  for (const key in colors) {
    document.documentElement.style.setProperty(key, colors[key])
  }
})

ReactDOM.render(<App />, document.querySelector("#root"))
