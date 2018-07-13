import React , { Component } from 'react';
import { Select } from 'antd';
const Option = Select.Option;

export default class NewSentSelect extends Component {
    handleChange = (value) => {
        this.props.buildingChange(value,this.props.name);
    }
    render (){
        const lists = this.props.data.map((item,index)=>{
            return <Option value={item.id} key={index}>{item.name}</Option>;
        });
        return (
            <Select  onChange={this.handleChange} className="new-file-select" size="small" placeholder='请选择楼盘'>
                {lists}
            </Select>
        )
    }
}