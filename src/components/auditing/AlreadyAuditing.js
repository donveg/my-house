import React , { Component } from 'react';
import TitleList from '../public/TitleList';
import BodyList from '../public/BodyList';
import { Pagination } from 'antd';
import AuditingResult from './AuditingResult';
import * as myFetch from '../../config/myFetch';
import * as functions from '../../config/functions';
import {inject,observer} from 'mobx-react';
import Empty from '../../config/Empty';

@inject('myStore')
@observer

export default class WaittingAuditing extends Component {
    constructor (props){
        super(props)
        this.state = {
            auditing : false,
            dataList :[],
            pageData:'',
            auditingData : '',
            uid :'',
            prefixPic : '',
        }
    }

    componentDidMount (){
        myFetch.get('/site/getbaseurl',{ //获取图片前缀
            token : this.props.myStore.token
        }).then(res => {
            this.setState({
                prefixPic : res.data[0],
            });
        });
        myFetch.get('/user/getwulist',{
            token : this.props.myStore.token
        }).then(res => {
            if(res.code === 200){
                let arr = [];
                let data = res.data.items;
                for(let i=0;i<data.length;i++){
                    arr.push(
                        [
                            {name:data[i].id,size:'wa-s-li'},
                            {name:data[i].realname,size:'wa-m-li'},
                            {name:this.judgeSex(data[i].sex),size:'wa-m-li'},
                            {name:data[i].qname,size:'wa-m-li'},
                            {name:data[i].bname,size:'wa-m-li'},
                            {name:data[i].uname+'单元',size:'wa-m-li'},
                            {name:data[i].hname,size:'wa-m-li'},
                            {name:functions.cutTimeMinutes(data[i].time),size:'wa-l-li'},
                            {name:this.judgeAdopt(data[i].state),size:'wa-m-li'},
                            {name:data[i].prealname,size:'wa-l-li'},
                            {name:<span className="public-list-button" onClick={this.openAuditing.bind(this,data[i].id)}>详情</span>,size:'wa-l-li'},
                        ]
                    );
                }
                this.setState({
                    dataList : arr,
                    pageData : res.data._meta,
                });
            }
        })
    }

    judgeNull = (val) => {//判断是否为空
        return val ? val : '-';
    }
    judgeSex = (sex) => {//判断性别
        return sex ===1 ? '男' : '女';
    }
    judgeAdopt = (state) =>{
        return parseInt(state,0) ===0 ? '未通过':'通过';
    }

    //改变分页数
    pageChange = page =>{ //参数括号可省略（参数值为1个）
        myFetch.get('/user/getwulist',{
            token : this.props.myStore.token,
            page : page,
        }).then(res => {
            if(res.code === 200){
                let arr = [];
                let data = res.data.items;
                for(let i=0;i<data.length;i++){
                    arr.push(
                        [
                            {name:data[i].id,size:'wa-s-li'},
                            {name:this.judgeNull(data[i].realname),size:'wa-m-li'},
                            {name:this.judgeSex(data[i].sex),size:'wa-m-li'},
                            {name:data[i].qname,size:'wa-m-li'},
                            {name:data[i].bname,size:'wa-m-li'},
                            {name:data[i].uname+'单元',size:'wa-m-li'},
                            {name:data[i].hname,size:'wa-m-li'},
                            {name:functions.cutTimeMinutes(data[i].time),size:'wa-l-li'},
                            {name:this.judgeAdopt(data[i].state),size:'wa-m-li'},
                            {name:data[i].prealname,size:'wa-l-li'},
                            {name:<span className="public-list-button" onClick={this.openAuditing.bind(this,data[i].id)}>详情</span>,size:'wa-l-li'},
                        ]
                    );
                }

                this.setState({
                    dataList : arr,
                    pageData : res.data._meta,
                });
            }
        })
    }

    openAuditing = uid=>{
        if(uid){
            myFetch.get('/user/getshshow',{
                token : this.props.myStore.token,
                uid : uid,
            }).then(res => {
                if(res.code === 200){
                    this.setState({
                        auditing :true,
                        auditingData : res.data[0], 
                        uid : uid,
                    })
                }
            });
            
        }
    }

    closeAuditing = () => {
        this.setState({
            auditing : false
        })
    }
    render (){
        const titleArr = [
            {name:'序号',size:'wa-s-li'},
            {name:'业主姓名',size:'wa-m-li'},
            {name:'性别',size:'wa-m-li'},
            {name:'所属楼盘',size:'wa-m-li'},
            {name:'楼宇序号',size:'wa-m-li'},
            {name:'所在单元',size:'wa-m-li'},
            {name:'房间编号',size:'wa-m-li'},
            {name:'审核时间',size:'wa-l-li'},
            {name:'审核结果',size:'wa-m-li'},
            {name:'审核人',size:'wa-l-li'},
            {name:'操作',size:'wa-l-li'},
        ];
        const lists = this.state.dataList.map((item,index)=>{
            return <BodyList data={item} key={index}/>
        });
        
        return (
            <div className="public-body">
            <div className="waitting-auditing-box">
                <TitleList data={titleArr}/>
                {this.state.dataList.length >0 ? lists : <Empty />}
                
                    {
                        this.state.pageData ? 
                        <div className="public-page">
                        <Pagination current={this.state.pageData.currentPage} total={parseInt(this.state.pageData.totalCount,0)}  onChange={this.pageChange} hideOnSinglePage={true} pageSize ={parseInt(this.state.pageData.perPage,0)} />,
                        </div> : null
                    }
            </div>
            {this.state.auditing ? <AuditingResult closeAuditing={this.closeAuditing} auditingData={this.state.auditingData} uid={this.state.uid} updateEdit={this.updateEdit} prefixPic={this.state.prefixPic}/> : null}
        </div>
        )
    }
}