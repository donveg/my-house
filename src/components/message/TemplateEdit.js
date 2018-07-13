import React , { Component } from 'react';
import { Icon } from 'antd';
import MessageInput from './MessageInput';
import { Input , Button,message} from 'antd';
import * as myFetch from '../../config/myFetch';
import {inject,observer} from 'mobx-react';
import * as functions from '../../config/functions';
const { TextArea } = Input;

@inject('myStore')
@observer

export default class TemplateEdit extends Component {
    constructor(props){
        super(props);
        this.state ={
            title : this.props.data.title,
            content : this.props.data.content,
        }
    }
    closeEditBox = ()=>{
        this.props.closeEditBox();
    }
    titleChange = (key,value) =>{
        this.setState({
            [key] : value
        });
    }
    contentChange = (e) =>{
        this.setState({
            content : e.target.value,
        });
    }
    sure =() =>{
        if(!functions.canSave(this.state.title,this.state.content)){
            message.warning('请填写完整内容！');
        }else{
            myFetch.put('/messages/'+this.props.data.id,{
                'title' : this.state.title,
                'content':this.state.content,
            },{
                'token' : this.props.myStore.token
            }).then(res =>{
                if(res.code === 200){
                    message.success('编辑成功!');
                    this.props.updateEdit();
                }
            });
        }
    }
    render (){
        return (
            <div className="public-out-box">
                <div className="public-inner-box template-edit-box">
                    <h2 className="new-file-title delete-inner-title">编辑消息</h2>
                    <Icon type="close-circle" className="public-close" onClick={this.closeEditBox}/>
                    <div className="nf-font">
                        <span className='nf-title'>消息标题 :</span>
                        <MessageInput placeholder='请输入消息标题' values = {this.state.title} keys='title' titleChange ={this.titleChange}/>
                    </div>
                    <div className="nf-font">
                        <span className='message-title'>消息内容 :</span>
                        <TextArea placeholder="输入消息内容" autosize={{ minRows: 6, maxRows: 6 }} className="message-content" value={this.state.content} onChange={this.contentChange}/>
                    </div>
                    <div className="public-button">
                        <Button type="primary" size='large' onClick={this.sure}>确认</Button>
                    </div>
                </div>
            </div>
        )
    }
}