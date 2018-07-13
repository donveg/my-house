import React , { Component } from 'react';
import { Input } from 'antd';

export default class NewSentInput extends Component {
    handChange =(e)=>{
        this.props.titleChange(this.props.keys,e.target.value);
    }
    render (){
        return (
            <Input placeholder={this.props.placeholder} onChange={this.handChange} size="small" value={this.props.values} className={this.props.size ? this.props.size : 'new-file-input'}/>
        )
    }
}