import React , { Component } from 'react';
import { Radio } from 'antd';
const RadioGroup = Radio.Group;

export default class OwnerRadio extends Component {

    handChange = (keys,e) => {
        this.props.defaultType[this.props.keys] = e.target.value ;
        this.props.dataChange(this.props.defaultType);
    }
    
    render (){
        const radios = this.props.data.map((item,index)=>
            <Radio value={item.value} key={index}>{item.name}</Radio> 
        )
        return (
            <RadioGroup onChange={this.handChange.bind(this,this.props.role)} className="owner-radio-group" defaultValue={this.props.defaultType[this.props.keys]}>
                {radios}
            </RadioGroup>
        )
    }
}