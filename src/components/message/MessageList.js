import React , { Component } from 'react';
import TitleList from '../public/TitleList';
import BodyList from '../public/BodyList';
import { Pagination ,message} from 'antd';
import MessageEdit from './MessageEdit';
import * as myFetch from '../../config/myFetch';
import * as functions from '../../config/functions';
import {inject,observer} from 'mobx-react';
import Empty from '../../config/Empty';
import Delete from '../../config/Delete';

@inject('myStore')
@observer

export default class MessageList extends Component {
    constructor (props){
        super(props)
        this.state = {
            edit : false,
            dataList :[],
            pageData :'',
            editData : '',
            delete : false,
            deleteId : ''
        }
    }

    componentDidMount (){
        myFetch.get('/msglog/client',{
            token : this.props.myStore.token
        }).then(res => {
            if(res.code === 200){
                this.setState({
                    dataList : res.data.items,
                    pageData : res.data._meta
                })
            }
        })
    }

    openEditBox (obj){
        if(obj){
            this.setState({
                edit : true,
                editData : obj
            })
        }
    }
    closeEditBox = () => {
        this.setState({
            edit : false
        })
    }
    openDeleteBox (id){
        this.setState({
            delete : true,
            deleteId : id
        })
    }
    closeDeleteBox = () =>{
        this.setState({
            delete : false
        })
    }
    judgeType = (a) => {//判断发送的方式
        return a ? '及时' : '定时';
    }
    judgeRange = (str) => {//转译接收终端
        let arr = str.split(',');
        let arr1 = [];
        for (let i=0 ; i<arr.length ; i++){
            if(arr[i] === '1'){
                arr1.push('物业终端'); 
            }else if(arr[i] === '2'){
                arr1.push('业主终端');
            }else if(arr[i] === '3'){
                arr1.push('门禁终端');
            }
        }
        return arr1.join(' , ');
    }
    judgeTime = (a,b) => {//转译发送时间
        return a ? functions.cutTimeMinutes(a) : functions.cutTimeMinutes(b);
    }
    deleteItem = () => { //删除消息
        myFetch.deleteIt('/msglogs/'+this.state.deleteId,{
            token : this.props.myStore.token
        }).then(res => {
            message.success('删除成功!');
            myFetch.get('/msglog/client',{
                token : this.props.myStore.token,
                page : this.state.pageData.currentPage
            }).then(res => {
                if(res.code === 200){
                    this.setState({
                        dataList : res.data.items,
                        pageData : res.data._meta,
                        delete : false
                    })
                }
            })
        })
    }
    pageChange = (page) => {//翻页
        myFetch.get('/msglog/client',{
            token : this.props.myStore.token,
            page : page
        }).then(res => {
            if(res.code === 200){
                this.setState({
                    dataList : res.data.items,
                    pageData : res.data._meta
                })
            }
        })
    }

    render (){
        const titleArr = [
            {name:'序号',size:'message-list-s-li'},
            {name:'消息标题',size:'message-list-m-li'},
            {name:'接收终端',size:'message-list-l-li'},
            // {name:'接收楼盘',size:'message-list-m-li'},
            {name:'发送类型',size:'message-list-m-li'},
            {name:'发送人',size:'message-list-l-li'},
            {name:'发送状态',size:'message-list-l-li'},
            {name:'发送时间',size:'message-list-l-li'},
            {name:'操作',size:'message-list-l-li'}
        ]
        let dataArr = [];
        let data = this.state.dataList;
        for(let i=0 ; i<data.length ; i++){
            dataArr.push([
                {name:data[i].id,size:'message-list-s-li'},
                {name:functions.cutLetters(data[i].title,6),size:'message-list-m-li'},
                {name:this.judgeRange(data[i].range),size:'message-list-l-li'},
                // {name:data[i].name,size:'message-list-m-li'},
                {name:this.judgeType(data[i].time),size:'message-list-m-li'},
                {name:data[i].realname,size:'message-list-l-li'},
                {name:parseInt(data[i].state,0) === 1?'发送成功':'待发送',size:'message-list-l-li'},
                {name:this.judgeTime(data[i].time,data[i].found_time),size:'message-list-l-li'},
                {name:<p><span className="public-list-button" onClick={this.openEditBox.bind(this,data[i])}>编辑</span><span className="public-list-delete" onClick={this.openDeleteBox.bind(this,data[i].id)}>删除</span></p>,size:'message-list-l-li'}
            ])
        }
        const lists = dataArr.map((item,index) => 
            <BodyList data={item} key={index}/>
        )
        
        return (
            <div className="message-list-box">
                <div className="waitting-auditing-box">
                    <TitleList data={titleArr}/>
                    {this.state.dataList.length > 0 ? lists : <Empty />}
                    {
                        this.state.pageData ? 
                        <div className="public-page">
                        <Pagination current={this.state.pageData.currentPage} total={parseInt(this.state.pageData.totalCount,0)}  onChange={this.pageChange} hideOnSinglePage={true} pageSize ={parseInt(this.state.pageData.perPage,0)} />,
                        </div> : null
                    }
                </div>
                {this.state.edit ? <MessageEdit closeEditBox={this.closeEditBox} editData={this.state.editData} updateList={this.updateList}/> : null}
                {this.state.delete ? <Delete closeDeleteBox={this.closeDeleteBox} deleteItem={this.deleteItem}/> : null}
            </div>
        )
    }
}