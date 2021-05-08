import React, {Fragment} from "react"
import './index.less'
import { Button } from 'antd'
import { getwords } from '@api/index.js'
export default class Menu extends React.Component {
  async getdata () {
    const res = await getwords({
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
