import React , { Component } from 'react';
import NewFileInput from './NewFileInput';
// import NewFileSelect from './NewFileSelect';
import {Icon , Button ,Select,message} from 'antd';
import * as myFetch from '../../config/myFetch';
import * as functions from '../../config/functions';
import {inject,observer} from 'mobx-react';
const Option = Select.Option;

@inject('myStore')
@observer

export default class PersonEdit extends Component {
    constructor(props){
        super(props);
        console.log(this.props.editData);
        this.state ={
            realname : this.props.editData.realname,
            username : this.props.editData.username,
            phone : this.props.editData.phone,
            manageListAll :[], //所有的栋数列表
            range : this.props.editData.list,
            // purview : this.props.editData.purview.split(","), //已有管理范围
            // purviewId : this.props.editData.purviewId.split(","), //已有管理范围id
        };
       // console.log(this.state.purviewId);
    }
    
    componentDidMount(){
        myFetch.get('/building/getlist',{
            id : '',
            token:this.props.myStore.token,
        }).then(res =>{
            this.setState({
                manageListAll : res.data, //所有的栋数列表
            });
        });
    }

    inputChange = (key,value) =>{ //输入修改
        this.setState({
            [key] : value,
        });
    }
    checkId =(list)=>{ //设置默认选中的值
        let arr = [];
        for (let i=0 ;i <list.length ; i++){
            arr.push(list[i].bid);
        }
        return arr ;
    }
    handleChange = (value) =>{ //下拉多选修改--数组
        let arr = [];
        for(let i =0; i<value.length; i++){
            arr.push({'bid':value[i]});
        }
        this.setState({
            range : arr,
        });
    }
    closeEditBox = () => {
        this.props.closeEditBox();
    }

    save =() =>{ //保存编辑
        let obj = this.state;
        if(!functions.canSave(obj.realname,obj.phone,obj.range)){
            message.warning('请填写相关信息!');
        }else{
            let postData ={
                'realname':obj.realname,
                'phone' : obj.phone,
                'list': obj.range,
            };
            myFetch.put('/properyusers/'+this.props.editData.id,postData,{
                'token' : this.props.myStore.token
            }).then(res =>{
                if(res.code === 20000){
                    let arr = Object.keys(res.message);
                    for(let i=0 ; i<arr.length ; i++){
                        if(arr[i] === 'realname'){
                            message.warning('姓名必须是中文汉字!');
                        }else if(arr[i] === 'phone'){
                            message.warning('电话号码必须是数字!');
                        }
                    }
                }else if(res.code === 200){
                    message.success('编辑成功!');
                    this.props.updateList();
                }
            });
        }
    }
    render (){
        const options = this.state.manageListAll.map((item,index)=>{
            return <Option key={item.id}>{item.name}</Option>;
        });
        return (
            <div className="public-out-box">
                <div className="public-inner-box person-edit-box">
                    <h2 className="new-file-title delete-inner-title">编辑物业人员</h2>
                    <Icon type="close-circle" className="public-close" onClick={this.closeEditBox}/>
                    <div className="new-file-inner public-auto">
                    <div className="nf-font">
                        <span className='nf-title'>姓名 :</span>
                        <NewFileInput placeholder='请输入姓名' inputValues={this.state.realname} keys='realname' inputChange={this.inputChange}/>
                    </div>
                    <div className="nf-font">
                        <span className='nf-title'>账号 :</span>
                        <p className="owner-font">{this.state.username}</p>
                    </div>
                   
                    <div className="nf-font">
                        <span className='nf-title'>手机 :</span>
                        <NewFileInput placeholder='请输入手机' inputValues={this.state.phone} keys='phone' inputChange={this.inputChange}/>
                    </div>
                    
                    
                    <div className="nf-font">
                        <span className="nf-title-range">管理范围 :</span>
                        <Select mode="multiple" placeholder="请选择管理范围..."  onChange={this.handleChange} className="new-file-select" size="small" defaultValue={this.checkId(this.state.range)}>
                            {options}
                        </Select>
                    </div>
                </div>
                    <div className="public-button">
                        <Button type="primary" size='large' onClick={this.save}>保存</Button>
                    </div>
                </div>
            </div>
        )
    }
}