import React , { Component } from 'react';
import { Input } from 'antd';

export default class MessageInput extends Component {
    titleChange = (e) =>{
        this.props.titleChange(this.props.keys,e.target.value);
    }
    render (){
        return (
            <Input placeholder={this.props.placeholder} size="small" className={this.props.size ? this.props.size : 'new-file-input'} onChange={this.titleChange} value={this.props.values}/>
        )
    }
}