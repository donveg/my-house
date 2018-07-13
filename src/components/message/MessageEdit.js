import React , { Component } from 'react';
import { Icon , Radio , DatePicker ,Checkbox ,Input ,Button ,message} from 'antd';
import NewSentInput from './NewSentInput';
import CheckTemplate from './CheckTemplate'; 
import moment from 'moment';
import 'moment/locale/zh-cn';
import * as myFetch from '../../config/myFetch';
import * as functions from '../../config/functions';
import {inject,observer} from 'mobx-react';
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const { TextArea } = Input;
moment.locale('zh-cn');
@inject('myStore')
@observer
export default class MessageEdit extends Component {
    constructor (props){
        super(props)
        this.state = {
            template : false,
            sentType : this.props.editData.time ? 1 : 2,
            timeDisabled : this.props.editData.time ? true : false,
            time : this.props.editData.time ? new Date().getTime()/1000 : this.props.editData.found_time,
            rangeArr : this.props.editData.range.split(','),
            range : this.props.editData.range,
            title : this.props.editData.title,
            content : this.props.editData.content,
        }
    }
    componentDidMount (){
        let arr = [];
        let arr1 = this.state.rangeArr;
        for(let i=0 ; i<arr1.length ; i++){
            if(arr1[i] === '1'){
                arr.push('物业终端');
            }else if(arr1[i] === '2'){
                arr.push('业主终端');
            }else if(arr1[i] === '3'){
                arr.push('门禁终端');
            }
        }
        this.setState({
            rangeArr : arr
        })
    }
    radioChange = (e) => {
        if(e.target.value === 2){
            this.setState({
                timeDisabled : false,
                sentType : e.target.value
            })
        }else{
            this.setState({
                timeDisabled : true,
                sentType : e.target.value
            })
        }
    }
    timeChange = (date) => {
        if(date){
            this.setState({
                time : Math.floor(date._d.getTime()/1000)
            })
        }else{
            this.setState({
                time : ''
            })
        }
    }
    checkboxChange = (value) => {
        let arr = [];
        for(let i=0 ; i<value.length ; i++){
            if(value[i] === '物业终端'){
                arr.push(1);
            }else if(value[i] === '业主终端'){
                arr.push(2);
            }else if(value[i] === '门禁终端'){
                arr.push(3);
            }
        }
        this.setState({
            rangeArr : value,
            range : arr.join(',')
        })
    }
    checkTemplate = () => {
        this.setState({
            template : true
        })
    }
    closeTemplate = () => {
        this.setState({
            template : false
        })
    }
    closeEditBox = () => {
        this.props.closeEditBox();
    }
    editMessage = (obj) => {
        this.setState({
            title : obj.title,
            content : obj.content,
            template : false
        })
    }
    handleMessageChange = (key,value) => {
        this.setState({
            [key]:value
        })
    }//标题内容
    messageChange = (e) => {
        this.setState({
            content : e.target.value
        })
    }//发送消息的内容
    save = () => {
        let obj = this.state;
        if(!functions.canSave(obj.title,obj.content,obj.sentType,obj.time,obj.range)){
            message.warning('请填写相关的选项!');
        }else{
            let dataForm = {
                title : obj.title,
                content : obj.content,
                type : obj.sentType,
                range : obj.range
            };
            if(obj.sentType === 2){
                dataForm['time'] = obj.time
            }
            myFetch.put('/msglogs/'+this.props.editData.id,dataForm,{
                token : this.props.myStore.token
            }).then(res => {
                if(res.code === 200){
                    message.success('保存成功!');
                    this.props.updateList();
                }
            })
        }
    }
    render (){
        const plainOptions = ['物业终端', '业主终端', '门禁终端'];
        return (
            <div>
                <div className="public-out-box">
                    <div className="public-inner-box message-edit-box">
                        <h2 className="new-file-title delete-inner-title">编辑消息</h2>
                        <Icon type="close-circle" className="public-close" onClick={this.closeEditBox}/>
                        <div className="ns-font">
                            <span className='ns-title'>发布时间 :</span>
                            <RadioGroup onChange={this.radioChange} className="new-sent-radio" value={this.state.sentType}>
                                <Radio value={1}>及时发送</Radio>
                                <Radio value={2}>按时发送</Radio>
                            </RadioGroup>
                            <DatePicker onChange={this.timeChange} className="new-sent-time" size='small' disabled={this.state.timeDisabled} defaultValue={moment(new Date(this.state.time*1000), 'YYYY-MM-DD')}/>
                        </div>
                        <div className="ns-font">
                            <span className='ns-title'>接收终端 :</span>
                            <CheckboxGroup options={plainOptions} defaultValue={this.state.rangeArr} onChange={this.checkboxChange} className="checkbox-group" value={this.state.rangeArr}/>
                        </div>
                        <div className="ns-font">
                            <span className='ns-title'>消息标题 :</span>
                            <NewSentInput placeholder='请输入消息标题' keys="title" values={this.state.title} handleMessageChange={this.handleMessageChange}/>
                        </div>
                        <div className="ns-font">
                            <span className='new-sent-title'>消息内容 :</span>
                            <TextArea placeholder="输入消息内容" autosize={{ minRows: 6, maxRows: 6 }} className="message-content" onChange={this.messageChange} value={this.state.content}/>
                        </div>
                        <div className="ns-font">
                            <span className="check-template" onClick={this.checkTemplate}>查看模板</span>
                        </div>
                        <div className="public-button">
                            <Button type="primary" size='large' onClick={this.save}>保存</Button>
                        </div>
                    </div>
                </div>
                {this.state.template ? <CheckTemplate closeTemplate={this.closeTemplate} editMessage={this.editMessage}/> : null}
            </div>
            
        )
    }
}