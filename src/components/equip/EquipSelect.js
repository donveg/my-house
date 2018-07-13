import React , { Component } from 'react';
import { Select } from 'antd';
const Option = Select.Option; 

export default class EquipSelect extends Component {
    handleChange = (value) => {
        console.log(value)
    }
    render (){
        return (
            <Select onChange={this.handleChange} className="equip-select" defaultValue='ass' size="small">
                <Option value="ass">ass</Option>
                <Option value="fuck">fuck</Option>
            </Select>
        )
    }
}