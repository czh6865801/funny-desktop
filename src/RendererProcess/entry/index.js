import React from "react";
import ReactDOM from "react-dom";
//在渲染器进程 (网页) 中。
import { ipcRenderer } from 'electron'
console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"

ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg) // prints "pong"
})
ipcRenderer.send('asynchronous-message', 'ping')

const App = () => {
    return <div> App入口 </div>;
};

ReactDOM.render(<App />, document.querySelector("#root"));
