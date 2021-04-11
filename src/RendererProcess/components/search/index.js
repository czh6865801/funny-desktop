import React, {Fragment} from "react"
import './index.less'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons';

export default class Search extends React.Component {
  render() {
    return (
      <div className="SearchComponents">
        <Input placeholder="搜索" className="marginBottomInput" prefix={<SearchOutlined />} />
      </div>
    )
  }
}