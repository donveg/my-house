import React , { Component } from 'react';
import { Icon } from 'antd';

export default class AuditingResult extends Component {
    closeAuditing = () => {
        this.props.closeAuditing();
    }
    changeType = (type) =>{
        return parseInt(type,0) === 1 ? '业主':'租户';
    }
    changeSex = (sex) =>{
        return parseInt(sex,0) === 0 ? '男':'女';
    }
    judgeAdopt = (state) =>{
        return parseInt(state,0) ===0 ? '未通过':'通过';
    }
    render (){
        return (
            <div className="public-out-box">
                <div className="auditing-face public-inner-box">
                    <h2 className="public-inner-title">审核详情</h2>
                    <Icon type="close-circle" className="public-close" onClick={this.closeAuditing}/>
                    <div className="auditing-result-box public-auto">
                        <div className="af-font">
                            <span className="af-title">业主姓名 : </span>
                            <p>{this.props.auditingData.realname}（{this.changeSex(this.props.auditingData.sex)}）</p>
                        </div>
                        <div className="af-font">
                            <span className="af-title">住户类型 : </span>
                            <p>{this.changeType(this.props.auditingData.type)}</p>
                        </div>
                        <div className="af-font">
                            <span className="af-title">住户电话 : </span>
                            <p>{this.props.auditingData.phone}</p>
                        </div>
                        <div className="af-font">
                            <span className="af-title">房间信息 : </span>
                            <p>{this.props.auditingData.name}，{this.props.auditingData.uname}单元，{this.props.auditingData.hname}</p>
                        </div>
                        <div className="af-font">
                            <span className="af-title">身份证照片（正面）:</span>
                            <div className="af-pic">
                                <p>{this.props.auditingData.idface ? <img src={this.props.prefixPic+this.props.auditingData.idface} alt='身份证照片'/>: '无身份证照片'}</p>
                            </div>
                        </div>
                        <div className="af-font">
                            <span className="af-title">身份证照片（背面） :</span>
                            <div className="af-pic">
                                <p>{this.props.auditingData.idface_back ? <img src={this.props.prefixPic+this.props.auditingData.idface_back} alt='身份证照片'/>: '无身份证照片'}</p>
                            </div>
                        </div>
                        <div className="af-font">
                            <span className="af-title">审核结果 : </span>
                            <p>{this.judgeAdopt(this.props.auditingData.state)}</p>
                        </div>
                        <div className="af-font">
                            <span className="af-title">未通过原因 : </span>
                            <p>{this.props.auditingData.content}</p>
                        </div>
                        <div className="af-font">
                            <span className="af-title">审核人 : </span>
                            <p>{this.props.auditingData.prealname}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}