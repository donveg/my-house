import React , { Component } from 'react';
import TitleList from '../public/TitleList';
import BodyList from '../public/BodyList';
import OwnerEdit from './OwnerEdit';
import { Pagination } from 'antd';
import * as myFetch from '../../config/myFetch';
import * as functions from '../../config/functions';
import Empty from '../../config/Empty';
import { inject , observer } from 'mobx-react';

@inject('myStore') 
@observer

export default class OwnerList extends Component {
    constructor(props){
        super(props);
        this.state = {
            edit : false, //编辑弹窗
            listData : [],//表格数据
            pageData : '', //分页数据
            editData : '',//编辑数据
        }
    }
    returnNull(val){ //数据为空处理
        return val ? val : '-';
    }
    changeType = (type) =>{
        return parseInt(type,0) === 1 ? '业主':'租户';
    }
    changeIsDel = (isDel) =>{
        return parseInt(isDel,0) === 0 ? '正常':'禁用';
    }
    changeSex = (sex) =>{
        return parseInt(sex,0) === 0 ? '男':'女';
    }

    openEditBox(obj){ //打开编辑
        if(obj){
            this.setState({
                edit : true,
                editData : obj,
            });
        }
    }
    closeEditBox = () => { //关闭编辑
        this.setState({
            edit : false
        })
    }
    
    componentWillMount(){ //页面加载完渲染
        myFetch.get('/user/getuser',{'token':this.props.myStore.token}).then(res=>{
            if(res.code === 200){
                let arr = [];
                let data = res.data.items;
                let vip = '否';
                for(let i=0;i<data.length;i++){
                    if(data[i].vip_ent_time){
                        vip = '是';
                    }
                    arr.push(
                        [
                            {name:data[i].uid,size:'owner-s-li'},
                            {name:data[i].phone,size:'owner-l-li'},
                            {name:data[i].realname,size:'owner-s-li'},
                            {name:this.returnNull(data[i].call),size:'owner-s-li'},
                            {name:this.changeSex(data[i].sex),size:'owner-s-li'},
                            {name:data[i].qname,size:'owner-m-li'},
                            {name:data[i].bname,size:'owner-m-li'},
                            {name:data[i].unit_name,size:'owner-m-li'},
                            {name:data[i].name,size:'owner-m-li'},
                            {name:this.changeType(data[i].type),size:'owner-s-li'},
                            {name:this.changeIsDel(data[i].is_del),size:'owner-s-li'},
                            {name:vip,size:'owner-m-li'},
                            {name:functions.cutTimeDate(data[i].vip_ent_time),size:'owner-l-li'},
                            {name:<span className="public-list-button" onClick={this.openEditBox.bind(this,data[i])}>编辑</span>,size:'owner-m-li'}
                        ]
                    );
                }

                this.setState({
                    listData : arr,
                    pageData : res.data._meta,
                });
            }
        });
    }
    updateEdit =() =>{ //编辑更新列表
        myFetch.get('/user/getuser',{
            'token' :this.props.myStore.token,
            'page'  :this.state.pageData.currentPage,
        }).then(res =>{
            if(res.code === 200){
                let arr = [];
                let data = res.data.items;
                let vip = '否';
                for(let i=0;i<data.length;i++){
                    if(data[i].vip_ent_time){
                        vip = '是';
                    }
                    arr.push(
                        [
                            {name:data[i].uid,size:'owner-s-li'},
                            {name:data[i].phone,size:'owner-l-li'},
                            {name:data[i].realname,size:'owner-s-li'},
                            {name:this.returnNull(data[i].call),size:'owner-s-li'},
                            {name:this.changeSex(data[i].sex),size:'owner-s-li'},
                            {name:data[i].qname,size:'owner-m-li'},
                            {name:data[i].bname,size:'owner-m-li'},
                            {name:data[i].unit_name,size:'owner-m-li'},
                            {name:data[i].name,size:'owner-m-li'},
                            {name:this.changeType(data[i].type),size:'owner-s-li'},
                            {name:this.changeIsDel(data[i].is_del),size:'owner-s-li'},
                            {name:vip,size:'owner-m-li'},
                            {name:functions.cutTimeDate(data[i].vip_ent_time),size:'owner-l-li'},
                            {name:<span className="public-list-button" onClick={this.openEditBox.bind(this,data[i])}>编辑</span>,size:'owner-m-li'}
                        ]
                    );
                }

                this.setState({
                    listData : arr,
                    edit : false,
                });
            }
        });
    }
    pageChange = (page) =>{ //分页请求
        myFetch.get('/user/getuser',{
            'token' :this.props.myStore.token,
            'page'  :page,
        }).then(res =>{
            if(res.code === 200){
                let arr = [];
                let data = res.data.items;
                let vip = '否';
                for(let i=0;i<data.length;i++){
                    if(data[i].vip_ent_time){
                        vip = '是';
                    }
                    arr.push(
                        [
                            {name:data[i].uid,size:'owner-s-li'},
                            {name:data[i].phone,size:'owner-l-li'},
                            {name:data[i].realname,size:'owner-s-li'},
                            {name:this.returnNull(data[i].call),size:'owner-s-li'},
                            {name:this.changeSex(data[i].sex),size:'owner-s-li'},
                            {name:data[i].qname,size:'owner-m-li'},
                            {name:data[i].bname,size:'owner-m-li'},
                            {name:data[i].unit_name,size:'owner-m-li'},
                            {name:data[i].name,size:'owner-m-li'},
                            {name:this.changeType(data[i].type),size:'owner-s-li'},
                            {name:this.changeIsDel(data[i].is_del),size:'owner-s-li'},
                            {name:vip,size:'owner-m-li'},
                            {name:functions.cutTimeDate(data[i].vip_ent_time),size:'owner-l-li'},
                            {name:<span className="public-list-button" onClick={this.openEditBox.bind(this,data[i])}>编辑</span>,size:'owner-m-li'}
                        ]
                    );
                }

                this.setState({
                    listData : arr,
                    pageData : res.data._meta,
                });
            }
        });
    }
    render (){
        const titleArr = [
            {name:'序号',size:'owner-s-li'},
            {name:'手机号',size:'owner-l-li'},
            {name:'姓名',size:'owner-s-li'},
            {name:'称呼',size:'owner-s-li'},
            {name:'性别',size:'owner-s-li'},
            {name:'所属楼盘',size:'owner-m-li'},
            {name:'所属楼宇',size:'owner-m-li'},
            {name:'所属单元',size:'owner-m-li'},
            {name:'房间编号',size:'owner-m-li'},
            {name:'类型',size:'owner-s-li'},
            {name:'状态',size:'owner-s-li'},
            {name:'是否VIP',size:'owner-m-li'},
            {name:'VIP到期',size:'owner-l-li'},
            {name:'操作',size:'owner-m-li'}
        ];
        const lists = this.state.listData.map((item,index) => 
            <BodyList data={item} key={index}/> 
        )
        return (
            <div className="public-body">
            <div className="waitting-auditing-box">
                <TitleList data={titleArr}/>
                {this.state.listData.length === 0 ? <Empty /> : lists}
                {
                    this.state.pageData ? 
                    <div className="public-page">
                    <Pagination current={this.state.pageData.currentPage} total={parseInt(this.state.pageData.totalCount,0)}  onChange={this.pageChange} hideOnSinglePage={true} pageSize ={parseInt(this.state.pageData.perPage,0)} />,
                    </div> : null
                }
                
            </div>
            {this.state.edit ? <OwnerEdit editData = {this.state.editData} closeEditBox={this.closeEditBox} updateEdit={this.updateEdit} changeSex={this.changeSex}/> : null}
            </div>
        )
    }
}