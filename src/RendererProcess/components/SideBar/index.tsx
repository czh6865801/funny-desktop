import React from "react"
import './index.less'
// import { Button } from 'antd'
import { getwords } from '@api/index.js'
interface Iprops {
  size: string
}
interface IState {
  value: string
}
export default class Menu extends React.Component<Iprops, IState> {
  constructor(props: Iprops) {
    super(props);
    this.state = {
      value: '',
    };
  }
  async getdata () {
    const res = await getwords({
      url: 'https://chp.shadiao.app/api.php'
    })
    this.setState({value: res.body})
  }
  render() {
    return (
      <div className="MenuComponents">
        {this.state.value}
        {/* <Button type="primary" onClick={()=>this.getdata()}>Primary</Button> */}
      </div>
    )
  }
}
