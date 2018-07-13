import React , { Component } from 'react';
import { Icon , Button } from 'antd';

export default class MarketDelete extends Component {
    closeDeleteBox = () => {
        this.props.closeDeleteBox();
    }
    sureDelete = () => {
        this.props.deleteItem();
    }
    render (){
        return (
            <div className="public-out-box">
                <div className="public-inner-box person-delete-box">
                    <h2 className="new-file-title delete-inner-title">确认操作提示</h2>
                    <Icon type="close-circle" className="public-close" onClick={this.closeDeleteBox}/>
                    <p className="delete-font">确定要删除吗 ? </p>
                    <div className="delete-buttons">
                        <Button className="delete-button" size="large" onClick={this.closeDeleteBox}>取消</Button>
                        <Button type="primary" size="large" onClick={this.sureDelete}>确认</Button>
                    </div>
                </div>
            </div>
        )
    }
}