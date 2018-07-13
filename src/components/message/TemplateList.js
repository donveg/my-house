import React , { Component } from 'react';
import TitleList from '../public/TitleList';
import BodyList from '../public/BodyList';
import TemplateEdit from './TemplateEdit';
import TemplateDelete from '../../config/Delete';
import { Pagination ,message } from 'antd';
import * as myFetch from '../../config/myFetch';
import {inject,observer} from 'mobx-react';
import * as functions from '../../config/functions';
import Empty from '../../config/Empty';

@inject('myStore')
@observer

export default class TemplateList extends Component {
    constructor(props){
        super(props);
        this.state= {
            listData :[],
            pageData :'',
            edit :false,
            editData : '',
            delete : false,
            
        }
    }
    componentDidMount(){
        myFetch.get('/message/getlist',{'token':this.props.myStore.token}).then(res =>{
            if(res.code === 200){
                let arr = [];
                let data = res.data.items;
                for(let i=0;i<data.length;i++){
                    arr.push(
                        [
                            {name:data[i].id,size:'template-s-li'},
                            {name:functions.cutLetters(data[i].title),size:'template-m-li'},
                            {name:functions.cutLetters(data[i].content),size:'template-l-li'},
                            {name:data[i].realname,size:'template-m-li'},
                            {name:functions.cutTimeMinutes(data[i].alter_time),size:'template-l-li'},
                            {name:functions.cutTimeMinutes(data[i].found_time),size:'template-l-li'},
                            {name:<p>
                                <span className="public-list-button" onClick={this.openEditBox.bind(this,data[i])} >编辑</span>
                                <span className="public-list-delete" onClick={this.openDeleteBox.bind(this,1)}>删除</span>
                                </p>,size:'template-m-li'}
                        ]
                    );
                }
                this.setState({
                    listData : arr,
                    pageData : res.data._meta
                });
            }
        });
    }

    pageChange =(page) =>{
        myFetch.get('/message/getlist',{
            token : this.props.myStore.token,
            page : page
        }).then(res => {
            if(res.code === 200){
                let arr = [];
                let data = res.data.items;
                for (let i=0 ; i<data.length ; i++){
                    arr.push([
                        {name:data[i].id,size:'template-s-li'},
                        {name:functions.cutLetters(data[i].title),size:'template-m-li'},
                        {name:functions.cutLetters(data[i].content),size:'template-l-li'},
                        {name:data[i].realname,size:'template-m-li'},
                        {name:functions.cutTimeMinutes(data[i].alter_time),size:'template-l-li'},
                        {name:functions.cutTimeMinutes(data[i].found_time),size:'template-l-li'},
                        {name:<p><span className="public-list-button" onClick={this.openEditBox.bind(this,data[i])}>编辑</span><span className="public-list-delete" onClick={this.openDeleteBox.bind(this,data[i].id)}>删除</span></p>,size:'template-m-li'}
                    ])
                }
                this.setState({
                    listData : arr ,
                    pageData : res.data._meta
                })
            }
        })
    }
    openEditBox(obj){
        if(obj){
            this.setState({
                edit :true,
                editData :obj,
            });
        }
    }
    closeEditBox = () =>{
        this.setState({
            edit : false,
        });
    }
    openDeleteBox = (id) =>{
        this.setState({
            delete :true,
            deleteId : id,
        });
    }
    closeDeleteBox = () => {
        this.setState({
            delete : false
        })
    }
    updateEdit = () => {
        myFetch.get('/message/getlist',{
            token : this.props.myStore.token,
            page : this.state.pageData.currentPage
        }).then(res => {
            if(res.code === 200){
                let arr = [];
                let data = res.data.items;
                for (let i=0 ; i<data.length ; i++){
                    arr.push([
                        {name:data[i].id,size:'template-s-li'},
                        {name:functions.cutLetters(data[i].title),size:'template-m-li'},
                        {name:functions.cutLetters(data[i].content),size:'template-l-li'},
                        {name:data[i].realname,size:'template-m-li'},
                        {name:functions.cutTimeMinutes(data[i].alter_time),size:'template-l-li'},
                        {name:functions.cutTimeMinutes(data[i].found_time),size:'template-l-li'},
                        {name:<p><span className="public-list-button" onClick={this.openEditBox.bind(this,data[i])}>编辑</span>
                        <span className="public-list-delete" onClick={this.openDeleteBox.bind(this,data[i].id)}>删除</span></p>,size:'template-m-li'}
                    ])
                }
                this.setState({
                    listData : arr ,
                    pageData : res.data._meta,
                    edit : false
                })
            }
        })
    }

    deleteItem = () => {
        myFetch.deleteIt('/messages/'+this.state.deleteId,{
            token : this.props.myStore.token
        }).then(res => {
            message.success('删除成功!');
            myFetch.get('/messages',{
                token : this.props.myStore.token,
                page : 1
            }).then(res => {
                if(res.code === 200){
                    let arr = [];
                    let data = res.data.items;
                    for (let i=0 ; i<data.length ; i++){
                        arr.push([
                            {name:data[i].id,size:'template-s-li'},
                            {name:functions.cutLetters(data[i].title),size:'template-m-li'},
                            {name:functions.cutLetters(data[i].content),size:'template-l-li'},
                            {name:data[i].username,size:'template-m-li'},
                            {name:functions.cutTimeMinutes(data[i].alter_time),size:'template-l-li'},
                            {name:functions.cutTimeMinutes(data[i].found_time),size:'template-l-li'},
                            {name:<p>
                                <span className="public-list-button" onClick={this.openEditBox.bind(this,data[i])}>编辑</span>
                                <span className="public-list-delete" onClick={this.openDeleteBox.bind(this,data[i].id)}>删除</span></p>,size:'template-m-li'}
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
            {name:'消息标题',size:'template-m-li'},
            {name:'消息内容',size:'template-l-li'},
            {name:'创建人',size:'template-m-li'},
            {name:'创建时间',size:'template-l-li'},
            {name:'更新时间',size:'template-l-li'},
            {name:'操作',size:'template-m-li'}
        ]
        const lists = this.state.listData.map((item,index)=> //特别注意大括号
            <BodyList data={item} key={index}/>
        );
       
        return (
            <div className="public-body">
                <div className="waitting-auditing-box">
                    <TitleList data={titleArr}/>
                    {this.state.listData.length > 0 ? lists : <Empty />}
                    {
                        this.state.pageData ? 
                        <div className="public-page">
                        <Pagination current={this.state.pageData.currentPage} total={parseInt(this.state.pageData.totalCount,0)}  onChange={this.pageChange} hideOnSinglePage={true} pageSize ={20} />,
                        </div> : null
                    }
                   
                </div>

                {this.state.edit ? <TemplateEdit closeEditBox={this.closeEditBox} data={this.state.editData} updateEdit={this.updateEdit}/> : null}
                {this.state.delete ? <TemplateDelete closeDeleteBox={this.closeDeleteBox} deleteItem={this.deleteItem}/> : null}
                
            </div>
        )
    }
}