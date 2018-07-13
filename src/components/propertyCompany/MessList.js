import React,{Component} from 'react';
import {Icon} from 'antd';//引入图标文件'
// import { message } from 'antd';
import * as functions from '../../config/functions';

export default class MessList extends Component{
    constructor(props){
        super(props);
        this.state={
            delete : false,
        };
    }
    showDelete = () =>{
        this.setState({
            delete : true,
        });
    }
   
    waitTime = time =>{
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
            t += sec.toFixed(2);
        }
        return t;
    }
   
    render(){
        const list = this.props.data.map((item,index)=>
            <li key={index}>
                <Icon type="clock-circle" className="btn-clock" />
                <div className="inline-b r-message">
                    <span>{functions.cutTimeMinutes(item.time)}  发起请求 </span>
                    <span>{item.bname}{item.uname+'单元'}，已等待 <label>{this.waitTime(item.time)} </label>分钟</span>
                </div>
                <Icon type="close-circle" className="btn-close" onClick={this.showDelete}/>
            </li>
        ); 
        const length = this.props.data.length;
        return(
            <div className='request-list'>
                    <p>待处理  <label>{length}</label>  条</p>
                    <ul className='public-auto'>
                        {list}
                    </ul>
            </div>
        )
    }
}