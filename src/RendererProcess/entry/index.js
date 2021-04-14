import React from "react"
import ReactDOM from "react-dom"
import App from '../components/app.js'
import api from '../../core/api'

React.$api = api

ReactDOM.render(<App />, document.querySelector("#root"))
