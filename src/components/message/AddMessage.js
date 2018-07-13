import React , { Component } from 'react';
import MessageInput from './MessageInput';
import { Input , Button ,message} from 'antd';
import * as myFetch from '../../config/myFetch';
import {inject,observer} from 'mobx-react';
import * as functions from '../../config/functions';

const { TextArea } = Input;

@inject('myStore')
@observer

export default class AddMessage extends Component {
    constructor(props){
        super(props);
        this.state={
            title :null,
            content :null,
        }
    }
    titleChange = (key,value) =>{
        this.setState({
            [key] : value,
        });
    }
    contentChange = (e) =>{
        console.log('content:'+e.target.value);
        this.setState({
            content : e.target.value,
        });
    }
    save = ()=>{
        if(!functions.canSave(this.state.title,this.state.content)){
            message.warning('请填写完整内容！');
        }else{
            myFetch.post('/message/addcomessage',{ 
                title : this.state.title,
                content : this.state.content
            },{
                'token':this.props.myStore.token
            }).then(res =>{
                if(res.code === 200){
                    message.success('新增成功!');
                    this.setState({
                        title : '',
                        content : '',
                    });
                }
            });
        }
    }
    render (){
        return (
            <div className="add-message-box">
                <h2 className="new-file-title">新增消息</h2>
                <div className="nf-font">
                    <span className='nf-title'>消息标题 :</span>
                    <MessageInput placeholder='请输入消息标题' keys='title' values = {this.state.title} titleChange={this.titleChange}/>
                </div>
                <div className="nf-font">
                    <span className='message-title'>消息内容 :</span>
                    <TextArea placeholder="输入消息内容" autosize={{ minRows: 6, maxRows: 6 }} value={this.state.content} className="message-content" onChange={this.contentChange}/>
                </div>
                <div className="public-button">
                    <Button type="primary" size='large' onClick={this.save}>确认</Button>
                </div>
            </div>
        )
    }
}