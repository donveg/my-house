import React , { Component } from 'react';
import { Radio ,DatePicker ,message } from 'antd';
import { Checkbox ,Input , Button} from 'antd';
// import NewSentSelect from './NewSentSelect';
import NewSentInput from './NewSentInput';
import CheckTemplate from './CheckTemplate';
import * as myFetch from '../../config/myFetch';
import * as functions from '../../config/functions';
import {inject,observer} from 'mobx-react';
import moment from 'moment';
import 'moment/locale/zh-cn'; //日期格式化
moment.locale('zh-cn');

const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const { TextArea } = Input;

@inject('myStore')
@observer

export default class NewSent extends Component {
    constructor (props){
        super(props)
        this.state = {
            template : false,
            sentType : '', //发送时间内容
            timeDisabled : true,
            sentTime : '', //发布时间
            time : new Date().getTime()/1000,//当前时间
            rangeArr : [], 
            range : '',  //接收终端
            market : '', //楼盘
            title : '', //标题
            content: '',//内容
            marketList : [], //楼盘列表
        }
    }

    componentDidMount(){
        myFetch.get('/quarter/getlist',{'token':this.props.myStore.token}).then(res=>{
            this.setState({
                marketList :res.data,
            });
        });
    }

    radioChange = (e) => { //发布时间
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
    timeChange = (date , dateString) => { //选择时间插件
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
    checkboxChange = (value) => { //接收终端
        let arr = [];
        for(let i =0;i<value.length;i++){
            if(value[i] === '业主终端'){
                arr.push(2);
            }else if(value[i] === '门禁终端'){
                arr.push(3);
            }
        }
        this.setState({
            rangeArr:value,
            range :arr.join(','),
        });
    }

    checkTemplate = () => {// 选择模板
        this.setState({
            template : true
        })
    }
    closeTemplate = () => { //关闭模板
        this.setState({
            template : false
        })
    }
    buildingChange=(val,key)=>{ //下拉选择楼盘
        this.setState({
            [key] : val,
        });
    }
    titleChange=(key,val)=>{ //消息标题
        this.setState({
            [key] : val,
        });
    }
    contentChange=(e)=>{ //消息内容
        this.setState({
            content : e.target.value,
        });
    }
    editMessage = (obj) => { //编辑模板列表
        this.setState({
            title : obj.title,
            content : obj.content,
            template : false
        })
    }
    save = () =>{ //保存
        let obj = this.state;
        if(!functions.canSave(obj.title,obj.content,obj.sentType,obj.time,obj.range)){
            message.warning('请填写相关的选项!');
        }else{
            let postData = {
                title : obj.title,
                content : obj.content,
                type : obj.sentType,
                range : obj.range,
               //qid : obj.market,
            }
            if(obj.sentType === 2){
                postData['time'] = obj.time;
            }
            myFetch.post('/msglogs',postData,{
                token : this.props.myStore.token
            }).then(res => {
                if(res.code === 200){
                    message.success('保存成功!');
                    this.setState({
                        title : '',
                        content : '',
                        sentType : '',
                        time : new Date().getTime()/1000,
                        rangeArr : [],
                        range : ''
                    })
                }
            })
        }
    }
    render (){
        const plainOptions = ['业主终端', '门禁终端'];
        return (
            <div>
                <div className="new-sent-box">
                    <h2 className="new-file-title">新建发送</h2>
                    <div className="ns-font">
                        <span className='ns-title'>发布时间 :</span>
                        <RadioGroup onChange={this.radioChange} className="new-sent-radio">
                            <Radio value={1}>及时发送</Radio>
                            <Radio value={2}>按时发送</Radio>
                        </RadioGroup>
                        <DatePicker onChange={this.timeChange} className="new-sent-time" size='small' disabled={this.state.timeDisabled} defaultValue={moment(new Date(), 'YYYY-MM-DD')}/>
                    </div>
                    <div className="ns-font">
                        <span className='ns-title'>接收终端 :</span>
                        <CheckboxGroup options={plainOptions}  onChange={this.checkboxChange} className="checkbox-group"/>
                    </div>
                    {/* <div className="ns-font">
                        <span className='ns-title'>接收楼盘 :</span>
                        <NewSentSelect data={this.state.marketList} name='market' buildingChange ={this.buildingChange}/>
                    </div> */}
                    <div className="ns-font">
                        <span className='ns-title'>消息标题 :</span>
                        <NewSentInput placeholder='请输入标题' keys="title" values={this.state.title} titleChange = {this.titleChange}/>
                    </div>
                    <div className="ns-font">
                        <span className='new-sent-title'>消息内容 :</span>
                        <TextArea placeholder="请输入消息内容" value = {this.state.content} autosize={{ minRows: 6, maxRows: 6 }} className="message-content" onChange={this.contentChange}/>
                    </div>
                    <div className="ns-font">
                        <span className="check-template" onClick={this.checkTemplate}>查看模板</span>
                    </div>
                    <div className="public-button">
                        <Button type="primary" size='large' onClick={this.save}>保存</Button>
                    </div>
                </div>
                {this.state.template ? <CheckTemplate closeTemplate={this.closeTemplate} editMessage={this.editMessage}/> : null}
            </div>
        )
    }
}