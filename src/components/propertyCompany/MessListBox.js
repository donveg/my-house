import React,{Component} from 'react';
import Signal from './Signal';
import {Icon} from 'antd';
import {message } from 'antd';
import * as functions from '../../config/functions';
import * as myFetch from '../../config/myFetch';
import Empty from '../../config/Empty';
import AgoraRTC from 'agora-rtc-sdk';
import { inject , observer } from 'mobx-react';

@inject('myStore') 
@observer

export default class MessListBox extends Component{
    constructor(props){
        super(props);
        this.state={
            macId : this.props.macId,
            delete : false,
            joinData:{},
            appendStr :'',
            connected : false,
            // clientData : null,
            clientData : this.props.clientData,
        }
        this.joinData = this.joinData.bind(this);
    };

     componentWillMount() {
        if(!AgoraRTC.checkSystemRequirements()) {
            console.log("浏览器不支持 webRTC");
        }
       // this.join(client,localStream, camera, microphone);
    }
   
    getThis = ()=>{
        return this;
    }
    handleNull = val =>{
        return val ? val :'-'
    }
    joinData = obj =>{
        this.setState({
            joinData : obj,
        });
        this.join(obj.number,this);
    }
    
    join = (number,obj) =>{ //加入频道
       // let client, localStream, camera, microphone;
        let client, localStream;
        let channel_key = null;
        let app_id = 'ac289be3a59c4f7f92cfd616b04d201e';
        let channel_value = number;
       
        //client = AgoraRTC.createClient({mode: 'interop'});
        client = obj.state.clientData;
        // obj.setState({
        //     clientData :client,
        // });
        client.init(app_id, function () { //初始化客户端对象 (init)
            client.join(channel_key, channel_value, null, function(uid) {
                console.log("用户id: " + uid + " 加入频道成功");
                // camera = '';
                // microphone = 'default';
        
                localStream = AgoraRTC.createStream({streamID: uid, audio: true, video: false, screen: false});
                localStream.setVideoProfile('720p_3'); //设置视频属性
                localStream.on("accessAllowed", function() { 
                  console.log("允许访问");
                });
                localStream.on("accessDenied", function() {
                  console.log("访问拒绝");
                });
        
                localStream.init(function() {
                  console.log("成功获取媒体");
                  localStream.play('agora_local');
        
                  client.publish(localStream, function (err) {
                    console.log("发布本地流错误: " + err);
                  });
        
                  client.on('stream-published', function (evt) {
                    console.log("发布本地流成功");
                  });
                }, function (err) {
                  console.log("失败获取媒体", err);  
                });
            }, function(err) {
              console.log("加入频道失败", err);
            });
          }, function (err) {
            console.log("初始化客户端对象失败", err);
          });

          let channelKey = "";
          client.on('error', function(err) {
            if (err.reason === 'DYNAMIC_KEY_TIMEOUT') {
              client.renewChannelKey(channelKey, function(){
                console.log("成功更新信道密钥");
              }, function(err){
                console.log("更新信道密钥失败: ", err);
              });
            }
          });
        
        
          client.on('stream-added', function (evt) {
            let stream = evt.stream;
            client.subscribe(stream, function (err) {
              console.log("订阅流失败：", err);
            });
          });
        
          client.on('stream-subscribed', function (evt) {
            let stream = evt.stream;
            let appendItem = '<div id="agora_remote'+stream.getId()+'" style="float:left; width:100%;height:600px;display:inline-block; background:#1B2434;"></div>';
            console.log("成功订阅远程流: " + stream.getId());
            obj.setState({
                appendStr :appendItem,
                connected : true,
            });
            stream.play('agora_remote' + stream.getId());
          });
    }
    //开门
    openDoor = mac =>{
        let obj = this;
        myFetch.get('/properyuser/open',{'token':obj.props.myStore.token,'mac':mac}).then(res=>{
            if(res.code === 200){
                message.success('开门成功!');
                obj.leave(mac,obj);
            }else{
                message.error('开门失败!');
            }
        });
    }
    // 关闭视频
     leave = (mac,obj)=> {
        let client = obj.state.clientData;
        client.leave(function () {
            myFetch.get('/properyuser/clone',{'token':obj.props.myStore.token,'mac':mac}).then(res=>{
                if(res.code === 200){
                    obj.setState({
                        connected : false,
                        joinData : {},
                    });
                    message.success('关闭会话成功!');
                }
            });
        }, function (err) {
            message.error('关闭会话失败!');
        });
      }
    
   
    openDeleteBox (mac,e){
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        this.props.openDeleteBox(mac);
    }
    waitTime = time =>{//时间戳转时分秒
        let timestamp=new Date().getTime();
        let s = parseInt(timestamp/1000,0)-time;
        let t;
        if(s > -1){
            let hour = Math.floor(s/3600);
            let min = Math.floor(s/60) % 60;
            let sec = s % 60;
            if(hour < 10) {
                t = '0'+ hour + ":";
            } else {
                t = hour + ":";
            }

            if(min < 10){t += "0";}
            t += min + ":";
            if(sec < 10){t += "0";}
            t += sec.toFixed(0);
        }
        return t;
    }
    render(){
           // console.log(this.props.handleList);
            const length = this.props.handleList.length;
            const list = this.props.handleList.map((item,index)=>
            <li key={index} onClick={this.joinData.bind(this,item)}>
                <Icon type="clock-circle" className="btn-clock" />
                <div className="inline-b r-message">
                    <span>{functions.cutTimeMinutes(item.time)}  发起请求 </span>
                    <span>{item.bname}{item.uname+'单元'}{item.name}，已等待 <label>{this.waitTime(item.time)} </label>秒</span>
                </div>
                <Icon type="close-circle" className="btn-close" onClick={this.openDeleteBox.bind(this,item.mac)} />
            </li>
            ); 
            
        return(
            <div>
                {/* 视频；列表 */}
                <div className='request-list'>
                        <p>待处理  <label>{length}</label>  条</p>
                        <ul className='public-auto'>
                            {length > 0 ? list : <Empty />}
                        </ul>
                </div>
                {/* 视频播放 */}
                <div className='answer-the-door'>
                    <div className='answer-head'>
                        <span>位置：{this.state.joinData.bname ? this.state.joinData.bname : '' }{this.state.joinData.uname ? this.state.joinData.uname : '暂无'}单元{this.state.joinData.name ? this.state.joinData.name : ''}</span>
                        <span>请求时间：{this.state.joinData.time ? functions.cutTimeMinutes(this.state.joinData.time) : '暂无'}</span>
                        <span>处理时长：{this.state.joinData.time ?this.waitTime(this.state.joinData.time) :'0'}秒</span>
                        <span className='text-right'>视频信号：<Signal /></span>
                        <span className='text-right'>音频信号：<Signal /></span>
                    </div> 
                    <div className='media-view-box'>
                        <div id="agora_local" dangerouslySetInnerHTML={{__html: this.state.appendStr}}></div>
                    </div>
                    {this.state.connected ? <div className='align-center operate-answer'>
                        <button className='btn open-the-door' onClick={()=>this.openDoor(this.state.joinData.mac)}>开门</button>
                        <span onClick={()=>this.leave(this.state.joinData.mac,this)}>关闭会话</span>
                    </div> : ''}
                    
            </div>
         </div>
        )
    }
}