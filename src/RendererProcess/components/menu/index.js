import React, {Fragment} from "react"
import './index.less'
import { Button } from 'antd'

export default class Menu extends React.Component {
  async getdata () {
    const res = await window.init({
      url: 'https://chp.shadiao.app/api.php'
    })
    console.log(111,res)
  }
  render() {
    return (
      <div className="MenuComponents">
        <Button type="primary" onClick={()=>this.getdata()}>Primary</Button>
      </div>
    )
  }
}
