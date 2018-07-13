import React , { Component } from 'react';
import TitleList from '../public/TitleList';
import BodyList from '../public/BodyList';
import { Pagination } from 'antd';
import * as myFetch from '../../config/myFetch';
import Empty from '../../config/Empty';
import { inject , observer } from 'mobx-react';

@inject('myStore')
@observer

export default class WaittingAuditing extends Component {
    constructor(props){
        super(props);
        this.state ={
            listData : [],
            pageData : ''
        }
    }
    returnNull(val){ //数据为空处理
        return val ? val : '-';
    }
    returnState(num){ //1 :正常 0:异常
        return parseInt(num,0) === 1 ? '正常' : '异常';
    }
    componentDidMount(){
        myFetch.get('/devices',{'token':this.props.myStore.token}).then(res =>{
            if(res.code === 200){
                let arr = [];
                let data = res.data.items;

                for(let i=0;i<data.length;i++){
                    arr.push(
                        [
                            {name:data[i].id,size:'equip-s-li'},
                            {name:data[i].name,size:'equip-m-li'},
                            {name:data[i].mac,size:'equip-m-li'},
                            {name:data[i].ename,size:'equip-m-li'},
                            {name:this.returnState(data[i].state),size:'equip-m-li'},
                            {name:data[i].qid,size:'equip-m-li'},
                            {name:data[i].bid,size:'equip-m-li'},
                            {name:data[i].uid,size:'equip-m-li'},
                            {name:this.returnNull(data[i].count),size:'equip-l-li'},
                            {name:this.returnNull(data[i].realname),size:'equip-l-li'},
                            {name:this.returnNull(data[i].phone),size:'equip-l-li'},
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
    pageChange(page){
        myFetch.get('/devices',{'token':this.props.myStore.token,'page':page}).then(res =>{
            if(res.code === 200){
                let arr = [];
                let data = res.data.items;

                for(let i=0;i<data.length;i++){
                    arr.push(
                        [
                            {name:data[i].id,size:'equip-s-li'},
                            {name:data[i].name,size:'equip-m-li'},
                            {name:data[i].mac,size:'equip-m-li'},
                            {name:data[i].ename,size:'equip-m-li'},
                            {name:data[i].state,size:'equip-m-li'},
                            {name:data[i].qid,size:'equip-m-li'},
                            {name:data[i].bid,size:'equip-m-li'},
                            {name:data[i].uid,size:'equip-m-li'},
                            {name:data[i].count,size:'equip-l-li'},
                            {name:data[i].realname,size:'equip-l-li'},
                            {name:data[i].phone,size:'equip-l-li'},
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
            {name:'序号',size:'equip-s-li'},
            {name:'设备名称',size:'equip-m-li'},
            {name:'设备编号',size:'equip-m-li'},
            {name:'出入口',size:'equip-m-li'},
            {name:'运行状态',size:'equip-m-li'},
            {name:'所属楼盘',size:'equip-m-li'},
            {name:'所属楼宇',size:'equip-m-li'},
            {name:'所属单元',size:'equip-m-li'},
            {name:'覆盖人数',size:'equip-l-li'},
            {name:'物业管理人',size:'equip-l-li'},
            {name:'管理人电话',size:'equip-l-li'},
        ]
        let lists = this.state.listData.map((item,index)=>
            <BodyList data={item} key={index} />
        );
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
           
            </div>
        )
    }
}