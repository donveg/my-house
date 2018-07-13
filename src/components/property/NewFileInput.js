import React , { Component } from 'react';
import { Input } from 'antd';

export default class NewFileInput extends Component {
    inputChange=(e)=>{
        this.props.inputChange(this.props.keys,e.target.value);
    }
    render (){
        return (
            <Input placeholder={this.props.placeholder} size="small" className="new-file-input" value={this.props.inputValues} onChange={this.inputChange}/>
        )
    }
}