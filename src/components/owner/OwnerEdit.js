import React , { Component } from 'react';
import { Icon , Button , message} from 'antd';
import OwnerRadio from './OwnerRaido';
import * as myFetch from '../../config/myFetch';
import { inject , observer } from 'mobx-react';

@inject('myStore')
@observer

export default class OwnerEdit extends Component {
    constructor(props){
        super(props);
        this.state={
            household:{
                realname:this.props.editData.realname,
                sex : this.props.editData.sex,
                qname :this.props.editData.qname,
                type : parseInt(this.props.editData.type,0),
                is_del :parseInt(this.props.editData.is_del,0),
            }
        }
    }
    changeSex = (sex) =>{
        return parseInt(sex,0) === 0 ? '男':'女';
    }
    
    closeEditBox = () => {
        this.props.closeEditBox();
    }

    dataChange = (obj) => {
        this.setState({
            household : obj
        })
    }

    editSure = ()=>{
        let obj = this.state.household;
        myFetch.put('/users/'+this.props.editData.uid,{
            type : obj.type,
            is_del : obj.is_del,
        },{
            token : this.props.myStore.token
        }).then(res => {
            if(res.code === 200){
                message.success('编辑成功!');
                this.props.updateEdit();
            }else{
                message.success(res.message);
            }
        })
    }
    render (){
        return (
            <div className="public-out-box">
                <div className="public-inner-box owner-edit-box">
                    <h2 className="new-file-title delete-inner-title">编辑住户</h2>
                    <Icon type="close-circle" className="public-close" onClick={this.closeEditBox}/>
                    <div className="nf-font">
                        <span className='nf-title'>业主姓名 :</span>
                        <p className="owner-font">{this.state.household.realname}</p>
                    </div>
                    <div className="nf-font">
                        <span className='nf-title'>性别 :</span>
                        <p className="owner-font">{this.changeSex(this.state.household.sex)}</p>
                    </div>
                    <div className="nf-font">
                        <span className='nf-title'>所属楼盘 :</span>
                        <p className="owner-font">{this.state.household.qname}</p>
                    </div>
                    <div className="nf-font">
                        <span className='nf-title'>类型 :</span>
                        <OwnerRadio data={[{name:'业主',value:1},{name:'租户',value:2}]} defaultType={this.state.household} keys='type' dataChange = {this.dataChange}/>
                    </div>
                    <div className="nf-font">
                        <span className='nf-title'>状态 :</span>
                        <OwnerRadio data={[{name:'正常',value:0},{name:'禁用',value:1}]} defaultType={this.state.household} keys='is_del' dataChange = {this.dataChange}/>
                    </div>
                    <br/>
                    <div className="public-button big-margin">
                        <Button type="primary" size='large' onClick={this.editSure}>保存</Button>
                    </div>
                </div>
            </div>
        )
    }
}