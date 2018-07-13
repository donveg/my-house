import React , { Component } from 'react';
import { Icon ,Button } from 'antd';
import EquipSelect from './EquipSelect';
import EquipInput from './EquipInput';

export default class EquipEdit extends Component {
    closeEdit = () =>{
        this.props.closeEdit();
    }
    render (){
        return (
            <div className="public-out-box">
                <div className="public-inner-box equip-edit-box">
                    <h2 className="public-inner-title">编辑设备</h2>
                    <Icon type="close-circle" className="public-close" onClick ={this.closeEdit}/>
                    <div className="equip-font">
                        <span className="equip-title">设备名称 : </span>
                        <p>小米23988291</p>
                    </div>
                    <div className="equip-font">
                        <span className="equip-title">所属楼盘 : </span>
                        <EquipSelect />
                    </div>
                    <div className="equip-font">
                        <span className="equip-title">所属楼宇 : </span>
                        <EquipSelect />
                    </div>
                    <div className="equip-font">
                        <span className="equip-title">所属单元 : </span>
                        <EquipSelect />
                    </div>
                    <div className="equip-font">
                        <span className="equip-title">出入口 : </span>
                        <EquipSelect />
                    </div>
                    <div className="equip-font">
                        <span className="equip-title">覆盖人数 : </span>
                        <EquipInput />
                    </div>
                    <div className="equip-font">
                        <span className="equip-title">物业管理人 : </span>
                        <EquipInput />
                    </div>
                    <div className="equip-font">
                        <span className="equip-title">管理人电话 : </span>
                        <EquipInput />
                    </div>
                    <div className="public-button">
                        <Button type="primary" size='large'>确认</Button>
                    </div>
                </div>
            </div>
        )
    }
}