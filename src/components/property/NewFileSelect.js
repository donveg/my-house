import React , { Component } from 'react';
import { Select } from 'antd';
const Option = Select.Option;

export default class NewFileSelect extends Component {
    handleChange = (value) => {
        console.log(value)
    }
    render (){
        return (
            <Select defaultValue="lucy" onChange={this.handleChange} className="new-file-select" size="small">
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
            </Select>
        )
    }
}