import React from "react"
import Search from './search'
import './app.less'
export default class Login extends React.Component {
  render() {
    return (
      <>
        <div className="layout_left">
          <Search></Search>
        </div>
        <div className="layout_right">右</div>
      </>
    )
  }
}