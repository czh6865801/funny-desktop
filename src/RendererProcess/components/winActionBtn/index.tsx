import React from "react"
import './index.less'
interface Iprops {

}
interface IState {

}
export default class winActionBtn extends React.Component<Iprops, IState> {
  constructor(props: Iprops) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
      <div className="winActionBtn">
        <span className="action isAlwaysOnTop"></span>
        <span className="action mini"></span>
        <span className="action max"></span>
        <span className="action close"></span>
      </div>
    )
  }
}
