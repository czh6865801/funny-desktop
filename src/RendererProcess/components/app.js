import React from "react"
import Header from './header'
import Search from './search'
import Menu from './menu'
import './app.less'
export default class Login extends React.Component {
  render() {
    return (
      <>
        <Header></Header>
        <div className="layout">
          <div className="layout_left">
            <Search></Search>
            <Menu></Menu>
          </div>
          <div className="layout_right">右</div>
        </div>
      </>
    )
  }
}