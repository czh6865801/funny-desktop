import React, {Fragment} from "react"
import './index.less'
import { Button } from 'antd'
import { getwords } from '@api/index.js'
export default class Menu extends React.Component {
  constructor() {
    super();
    this.state = {
      value: null,
    };
  }
  async getdata () {
    const res = await getwords({
      url: 'https://chp.shadiao.app/api.php'
    })
    this.setState({value: res.body})
    console.log(111,res)
  }
  render() {
    return (
      <div className="MenuComponents">
        {this.state.value}
        <Button type="primary" onClick={()=>this.getdata()}>Primary</Button>
      </div>
    )
  }
}
