import React , { Component } from 'react';
import { Icon , Button } from 'antd';

export default class TemplateDelete extends Component {
    closeDeleteBox = () =>{
        this.props.closeDeleteBox();
    }
    cancelDeleteBox = () =>{
        this.props.closeDeleteBox();
    }
    render (){
        return (
            <div className="public-out-box">
                <div className="public-inner-box person-delete-box">
                    <h2 className="new-file-title delete-inner-title">确认操作提示</h2>
                    <Icon type="close-circle" className="public-close" onClick={this.closeDeleteBox}/>
                    <p className="delete-font">确定要删除此消息 ? </p>
                    <div className="delete-buttons">
                        <Button className="delete-button" size="large" onClick={this.cancelDeleteBox}>取消</Button>
                        <Button type="primary" size="large">确认</Button>
                    </div>
                </div>
            </div>
        )
    }
}