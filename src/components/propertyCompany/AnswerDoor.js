import React,{Component} from 'react';
import Signal from './Signal';
import * as functions from '../../config/functions';
// import AgoraRTC from 'agora-rtc-sdk';

export default class AnswerDoor extends Component{
    constructor(props){
        super(props);
        this.state={
            item : this.props.item,
        }
    };
    
    waitTime = time =>{//时间戳转时分秒
        let timestamp=new Date().getTime();
        let s = parseInt(timestamp/1000)-time;
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
       console.log(this.state.item);
        return(
            <div className='answer-the-door'>
                   <div className='answer-head'>
                        <span>位置：{this.state.item.bname}{this.state.item.uname+'单元'}</span>
                        <span>请求时间：{functions.cutTimeMinutes(this.state.item.time)}</span>
                        <span>处理时长小于{this.waitTime(this.state.item.time)}分钟</span>
                        <span className='text-right'>视频信号：<Signal /></span>
                        <span className='text-right'>音频信号：<Signal /></span>
                   </div> 
                    <div className='media-view-box'>
                        <div id="agora_local"></div>
                    </div>
                    <div className='align-center operate-answer'>
                        <button className='btn open-the-door'>开门</button>
                        <span>关闭会话</span>
                    </div>
                </div>
        )
    }
}