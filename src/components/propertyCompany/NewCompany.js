import React , { Component } from 'react';
import MessListBox from './MessListBox';
import {message } from 'antd';
// import AnswerDoor from './AnswerDoor';
import * as myFetch from '../../config/myFetch';
import TemplateDelete from '../../config/Delete';
import AgoraRTC from 'agora-rtc-sdk';

import { inject , observer } from 'mobx-react';

@inject('myStore') 
@observer

export default class NewCompany extends Component {
    constructor(props){
        super(props);
        this.state ={
            handleList :[],
            delete :false,
            deleteId : '',
            item : {},
            appendItem:'',
            clientData : AgoraRTC.createClient({mode: 'interop'}),
        }
    };

    componentDidMount() {
        //let aTime = this.FormatDateTime();
        let timer = 5000;
        // if(aTime>'17:05:00' || aTime<'06:00:00'){
        //     timer = 5000;
        // }
        this.timeoutId = setInterval(() => {
            myFetch.get('/properyuser/getredis',{'token':this.props.myStore.token}).then(res=>{//处理队列
                this.setState({
                    handleList : res.data,
                });
            })
        }, timer)
    }
    componentWillUnmount() {
        clearInterval(this.timeoutId)
    }
    FormatDateTime = () =>{
        let myDate = new Date();
        return myDate.getHours()+':'+myDate.getMinutes()+':'+myDate.getSeconds();
    }
    closeDeleteBox = () => {
        this.setState({
            delete : false
        })
    }
    openDeleteBox=(mac)=>{
        if(mac){
            this.setState({
                delete : true,
                deleteId : mac,
            })
        }
    }
    deleteItem(){ //确定删除
        let client = this.state.clientData;
        let obj = this;
        console.log('token==='+obj.props.myStore.token);
        client.leave(function () {
            myFetch.get('/properyuser/clone',{'token':obj.props.myStore.token,'mac':obj.state.deleteId}).then(res=>{
               if(res.code === 200){
                   this.setState({
                        delete : false,
                   });
                   message.success('关闭会话成功!');
                  console.log("关闭会话成功");
                }
            });
        }, function (err) {
          console.log("关闭会话失败");
        });
    }
   
    render (){
        return (
            <div>
                <div id="video">
                    <div id="agora_local"></div>
                </div>
                <MessListBox handleList ={this.state.handleList} openDeleteBox={this.openDeleteBox} join={this.join} clientData = {this.state.clientData}/>{/* 控制台请求列表 */}
                {/* <AnswerDoor item ={this.state.item} join = {this.join}/>控制台应答开门 */}
                {this.state.delete ? <TemplateDelete closeDeleteBox={this.closeDeleteBox} deleteItem={this.deleteItem} /> : null}
            </div>
        )
    }
}