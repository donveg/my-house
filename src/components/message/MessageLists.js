import React , { Component } from 'react';
import TitleList from '../public/TitleList';
import BodyList from '../public/BodyList';
import ViewMessage from './ViewMessage';
import ViewDelete from '../../config/Delete';
import { Pagination ,message } from 'antd';
import * as myFetch from '../../config/myFetch';
import {inject,observer} from 'mobx-react';
import * as functions from '../../config/functions';
import Empty from '../../config/Empty';

@inject('myStore')
@observer

export default class MessageList extends Component {
    constructor(props){
        super(props);
        this.state = {
            view : false, //编辑
            delete :false, //删除
            listData : [],
            pageData : '' , 
            viewData : '',          
        }
    }

    componentDidMount(){
        myFetch.get('/msgrecs',{'token':this.props.myStore.token}).then(res=>{
            if(res.code === 200){
                let arr = [];
                let data = res.data.items;
                for(let i=0;i<data.length;i++){
                    arr.push(
                        [
                            {name:data[i].id,size:'template-s-li'},
                            {name:'系统通知',size:'template-m-li'},
                            {name:functions.cutLetters(data[i].title),size:'template-l-li'},
                            {name:functions.cutLetters(data[i].content),size:'template-l-li'},
                            {name:'管理员',size:'template-m-li'},
                            {name:functions.cutTimeMinutes(data[i].time),size:'template-l-li'},
                            {name:<p>
                                    <span className="public-list-button" onClick={this.openViewBox.bind(this,data[i])}>查看</span>
                                    <span className="public-list-delete" onClick={this.openDeleteBox.bind(this,data[i].id)}>删除</span>
                                </p>,size:'template-m-li'}
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

    pageChange =(page) =>{
        myFetch.get('/msgrecs',{
            token : this.props.myStore.token,
            page : page
        }).then(res => {
            if(res.code === 200){
                let arr = [];
                let data = res.data.items;
                for (let i=0 ; i<data.length ; i++){
                    arr.push([
                        {name:data[i].id,size:'template-s-li'},
                        {name:'系统通知',size:'template-m-li'},
                        {name:functions.cutLetters(data[i].title),size:'template-l-li'},
                        {name:functions.cutLetters(data[i].content),size:'template-l-li'},
                        {name:'管理员',size:'template-m-li'},
                        {name:functions.cutTimeMinutes(data[i].time),size:'template-l-li'},
                        {name:<p>
                                <span className="public-list-button" onClick={this.openViewBox.bind(this,data[i])}>查看</span>
                                <span className="public-list-delete" onClick={this.openDeleteBox.bind(this,data[i].id)}>删除</span>
                            </p>,size:'template-m-li'}
                    ])
                }
                this.setState({
                    listData : arr ,
                    pageData : res.data._meta
                })
            }
        })
    }

    openViewBox = obj =>{ //查看详情
        if(obj){
            this.setState({
                viewData : obj,
                view : true,
            });
        }
    }
    closeViewBox = () =>{
        this.setState({
            view : false,
        });
    }
    openDeleteBox = id =>{
        if(id){
            this.setState({
                delete : true,
                deleteId : id,
            });
        }
    }
    closeDeleteBox = () =>{
        this.setState({
            delete : false,
        });
    }
    deleteItem = () => {
        myFetch.deleteIt('/msgrecs/'+this.state.deleteId,{
            token : this.props.myStore.token
        }).then(res => {
            message.success('删除成功!');
            myFetch.get('/msgrecs',{
                token : this.props.myStore.token,
                page : 1
            }).then(res => {
                if(res.code === 200){
                    let arr = [];
                    let data = res.data.items;
                    for (let i=0 ; i<data.length ; i++){
                        arr.push([
                            {name:data[i].id,size:'template-s-li'},
                            {name:'系统通知',size:'template-m-li'},
                            {name:functions.cutLetters(data[i].title),size:'template-l-li'},
                            {name:functions.cutLetters(data[i].content),size:'template-l-li'},
                            {name:'管理员',size:'template-m-li'},
                            {name:functions.cutTimeMinutes(data[i].time),size:'template-l-li'},
                            {name:<p>
                                    <span className="public-list-button" onClick={this.openViewBox.bind(this,data[i])}>查看</span>
                                    <span className="public-list-delete" onClick={this.openDeleteBox.bind(this,data[i].id)}>删除</span>
                                </p>,size:'template-m-li'}
                        ])
                    }
                    this.setState({
                        listData : arr ,
                        pageData : res.data._meta,
                        delete : false
                    })
                }
            })
        })
    }
    render (){
        const titleArr = [
            {name:'序号',size:'template-s-li'},
            {name:'消息类型',size:'template-m-li'},
            {name:'消息标题',size:'template-l-li'},
            {name:'消息内容',size:'template-l-li'},
            {name:'创建人',size:'template-m-li'},
            {name:'发送时间',size:'template-l-li'},
            {name:'操作',size:'template-m-li'}
        ]

        const lists = this.state.listData.map((item,index)=>{
            return <BodyList data={item} key={index}/>
        });
        
        return (
            <div className="public-body">
                <div className="waitting-auditing-box">
                    <TitleList data={titleArr}/>
                    {this.state.listData.length >0 ? lists : <Empty />}
                
                    {
                        this.state.pageData ? 
                        <div className="public-page">
                        <Pagination current={this.state.pageData.currentPage} total={parseInt(this.state.pageData.totalCount,0)}  onChange={this.pageChange} hideOnSinglePage={true} pageSize ={parseInt(this.state.pageData.perPage,0)} />,
                        </div> : null
                    }
                </div>
                {this.state.view ? <ViewMessage closeViewBox={this.closeViewBox} data={this.state.viewData}/> :null}
                {this.state.delete ? <ViewDelete closeDeleteBox={this.closeDeleteBox} deleteItem={this.deleteItem}/> : null}
            </div>
        )
    }
}