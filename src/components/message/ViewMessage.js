import React , { Component } from 'react';
import { Icon } from 'antd';
import * as functions from '../../config/functions';

export default class TemplateEdit extends Component {
    closeViewBox = () => {
        this.props.closeViewBox();
    }
    render (){
        return (
            <div className="public-out-box">
                <div className="public-inner-box template-edit-box ">
                    <h2 className="new-file-title delete-inner-title">消息详情</h2>
                    <Icon type="close-circle" className="public-close" onClick={this.closeViewBox}/>
                    <div className="equip-font">
                        <span className="equip-title font-14">消息标题：</span>
                        <p className="font-14">{this.props.data.title}</p>
                    </div>
                    <div className="equip-font">
                        <span className="equip-title font-14">发送时间：</span>
                        <p className="font-14">{functions.cutTimeMinutes(this.props.data.time)}</p>
                    </div>
                    <div className="equip-font">
                        <span className="equip-title font-14 vertical-top">消息内容：</span>
                        <p className="font-14 message-content textarea-height">{this.props.data.content}</p>
                    </div>
                   
                </div>
            </div>
        )
    }
}