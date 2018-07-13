import React , { Component } from 'react';
import { Icon ,Radio , Button,message} from 'antd';
import * as myFetch from '../../config/myFetch';
import * as functions from '../../config/functions';
import {inject,observer} from 'mobx-react';
// import UploadPic from './UploadPic';
const RadioGroup = Radio.Group;

@inject('myStore')
@observer

export default class AuditingFace extends Component{
    constructor(props){
        super(props);
        this.state={
            resultDisabled : true,
            resultType :'',
            resultInfo :'',
        }
        console.log(this.props.prefixPic);
    }
    changeType = (type) =>{
        return parseInt(type,0) === 1 ? '业主':'租户';
    }
    changeSex = (sex) =>{
        return parseInt(sex,0) === 0 ? '男':'女';
    }
    radioChange = e =>{ //审核通过按钮
        if(e.target.value === 1){
            this.setState({
                resultDisabled :true,
                resultType :e.target.value,
            });
        }else{
            this.setState({
                resultDisabled :false,
                resultType :e.target.value,
            });
        }
      
    }
    areaChange = e =>{ //不通过原因
        this.setState({
            resultInfo : e.target.value,
        });
    }

    sure = () =>{ //保存
        if(!functions.canSave(this.state.resultType)){
            message.warning('请选择审核结果');
        }else{
            let postData = {};
            if(this.state.resultType === 2){ //为不通过时
                if(!functions.canSave(this.state.resultInfo)){
                    message.warning('请填写不通过原因');return;
                }else{
                    postData = {
                        'auth_state': 0,
                        'type':2,
                        'content' :this.state.resultInfo,
                    }
                }
            }else{
                postData = {
                    'auth_state': 1,
                    'type':2,
                }
            }
           // console.log(postData);
           myFetch.put('/users/'+this.props.uid,postData,{
                token : this.props.myStore.token
            }).then(res => {
                if(res.code === 200){
                    message.success('审核成功!');
                    this.props.updateEdit();
                }
            })
          
        }
    }

    updateEdit = () => {
        this.props.updateEdit();
    }

    closeAuditing = () => {
        this.props.closeAuditing();
    }
    render(){
        return (
            <div className="public-out-box">
            <div className="auditing-face public-inner-box ">
                <h2 className="public-inner-title">审核业主面部图像</h2>
                <Icon type="close-circle" className="public-close" onClick={this.closeAuditing}/>
                <div className="auditing-inner-box public-auto">
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
                        <span className="af-title">身份证照片（正面）: </span>
                        <div className="af-pic">
                            <p>{this.props.auditingData.idface ? <img src={this.props.prefixPic+this.props.auditingData.idface} alt='身份证照片'/>: '无身份证照片'}</p>
                        </div>
                        {/* <UploadPic /> */}
                    </div>
                    <div className="af-font">
                        <span className="af-title">身份证照片（背面）:</span>
                        <div className="af-pic">
                            <p>{this.props.auditingData.idface_back ? <img src={this.props.prefixPic+this.props.auditingData.idface_back} alt='身份证照片'/>: '无身份证照片'}</p>
                        </div>
                        {/* <UploadPic /> */}
                    </div>
                    <div className="af-font">
                        <span className="af-title">审核结果 : </span>
                        <RadioGroup  className="auditing-group" onChange = {this.radioChange} >
                            <Radio value={1} >通过</Radio>
                            <Radio value={2} >未通过</Radio>
                        </RadioGroup>
                    </div>
                    <div className="af-font">
                        <span className="af-title"></span>
                        <textarea className="af-text" disabled={this.state.resultDisabled} onChange={this.areaChange} ></textarea>
                    </div>
                </div>
                <div className="public-button">
                    <Button type="primary" size='large' onClick={this.sure}>确认</Button>
                </div>
            </div>
        </div>
        )
    }
}