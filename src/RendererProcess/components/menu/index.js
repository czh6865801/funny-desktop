import React, {Fragment} from "react"
import './index.less'
import { Button } from 'antd'

export default class Menu extends React.Component {
  async getdata () {
    const res = await React.$api.getdata()
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
