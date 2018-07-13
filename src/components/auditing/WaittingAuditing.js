import React , { Component } from 'react';
import { Pagination } from 'antd'; //引入分页组件
import TitleList from '../public/TitleList';
import BodyList from '../public/BodyList';
import AuditingFace from './AuditingFace';
import * as myFetch from '../../config/myFetch';
import * as functions from '../../config/functions';
import {inject,observer} from 'mobx-react';
import Empty from '../../config/Empty';

@inject('myStore')
@observer

export default class WaittingAuditing extends Component {
    constructor(props){
        super(props); //调用父类的构造函数
        this.state = {
            auditing : false ,//标记是否显示弹窗
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
        myFetch.get('/user/getwysh',{ 
            token : this.props.myStore.token
        }).then(res => {
            if(res.code === 200){
                let arr = [];
                let data = res.data.items;
                for(let i=0;i<data.length;i++){
                    arr.push(
                        [
                            {name:data[i].uid,size:'wa-s-li'},
                            {name:data[i].realname,size:'wa-m-li'},
                            {name:this.judgeSex(data[i].sex),size:'wa-l-li'},
                            {name:this.judgeNull(data[i].call),size:'wa-l-li'},
                            {name:data[i].bname,size:'wa-l-li'},
                            {name:data[i].unit_name+'单元',size:'wa-l-li'},
                            {name:data[i].floor_num,size:'wa-l-li'},
                            {name:functions.cutTimeMinutes(data[i].vip_ent_time),size:'wa-l-li'},
                            {name:<span className="public-list-button" onClick={this.openAuditing.bind(this,data[i].uid)}>审核</span>,size:'wa-l-li'},
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

    //改变分页数
    pageChange = page =>{ //参数括号可省略（参数值为1个）
        myFetch.get('/user/getwysh',{
            token : this.props.myStore.token,
            page : page,
        }).then(res => {
            if(res.code === 200){
                let arr = [];
                let data = res.data.items;
                for(let i=0;i<data.length;i++){
                    arr.push(
                        [
                            {name:data[i].uid,size:'wa-s-li'},
                            {name:data[i].realname,size:'wa-m-li'},
                            {name:this.judgeSex(data[i].sex),size:'wa-l-li'},
                            {name:this.judgeNull(data[i].call),size:'wa-l-li'},
                            {name:data[i].bname,size:'wa-l-li'},
                            {name:data[i].unit_name+'单元',size:'wa-l-li'},
                            {name:data[i].floor_num,size:'wa-l-li'},
                            {name:functions.cutTimeMinutes(data[i].vip_ent_time),size:'wa-l-li'},
                            {name:<span className="public-list-button" onClick={this.openAuditing.bind(this,data[i].uid)}>审核</span>,size:'wa-l-li'},
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


    //显示弹窗
    openAuditing = uid=>{
        if(uid){
            myFetch.get('/user/getshow',{
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
    
    //关闭弹窗
    closeAuditing =() =>{ //没有参数，，直接为空
        this.setState({
            auditing : false
        })
    }
    updateEdit = () => { //更新审核后的数据
        myFetch.get('/user/getwysh',{
            token : this.props.myStore.token,
            page : this.state.pageData.currentPage
        }).then(res => {
            if(res.code === 200){
                let arr = [];
                let data = res.data.items;
                for(let i=0;i<data.length;i++){
                    arr.push(
                        [
                            {name:data[i].uid,size:'wa-s-li'},
                            {name:this.judgeNull(data[i].realname),size:'wa-m-li'},
                            {name:this.judgeSex(data[i].sex),size:'wa-l-li'},
                            {name:this.judgeNull(data[i].call),size:'wa-l-li'},
                            {name:data[i].bname,size:'wa-l-li'},
                            {name:data[i].unit_name+'单元',size:'wa-l-li'},
                            {name:data[i].floor_num,size:'wa-l-li'},
                            {name:functions.cutTimeMinutes(data[i].found_time),size:'wa-l-li'},
                            {name:<span className="public-list-button" onClick={this.openAuditing.bind(this,data[i].uid)}>审核</span>,size:'wa-l-li'},
                        ]
                    );
                }

                this.setState({
                    dataList : arr,
                    pageData : res.data._meta,
                    auditing : false,
                });
            }
        })
    }

    render (){
        // 定义数据
        const titleArr = [ //表头
            {name:'序号',size:'wa-s-li'},
            {name:'住户姓名',size:'wa-m-li'},
            {name:'性别',size:'wa-l-li'},
            {name:'电话号码',size:'wa-l-li'},
            {name:'楼宇序号',size:'wa-l-li'},
            {name:'所在单元',size:'wa-l-li'},
            {name:'房间编号',size:'wa-l-li'},
            {name:'提交时间',size:'wa-l-li'},
            {name:'操作',size:'wa-l-li'},
        ];
        const lists = this.state.dataList.map((item,index)=>{
            return <BodyList data={item} key={index}/>
        });

        return (
            <div className="public-body">
                <div className="waitting-auditing-box">
                   <TitleList data={titleArr} />
                   {this.state.dataList.length >0 ? lists : <Empty />}
                   
                       {
                           this.state.pageData ? 
                           <div className="public-page">
                           <Pagination current={this.state.pageData.currentPage} total={parseInt(this.state.pageData.totalCount,0)}  onChange={this.pageChange} hideOnSinglePage={true} pageSize ={parseInt(this.state.pageData.perPage,0)} />,
                           </div> : null
                       }
                </div>

                {/* 表达式判断弹窗是否显示 */}
                {this.state.auditing ? < AuditingFace  closeAuditing={this.closeAuditing} auditingData={this.state.auditingData} uid={this.state.uid} updateEdit={this.updateEdit} prefixPic={this.state.prefixPic}/> : null}
            </div>
        )
    }
}