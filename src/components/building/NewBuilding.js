import React , { Component } from 'react';
import TitleList from '../public/TitleList';
import BodyList from '../public/BodyList';
import { Pagination } from 'antd';
import * as myFetch from '../../config/myFetch';
import Empty from '../../config/Empty';
import { inject , observer } from 'mobx-react';

@inject('myStore')
@observer

export default class NewBuilding extends Component {
    constructor (props){
        super(props)
        this.state = {
            listData : [] ,
            pageData : '',
        }
    }

    returnNull(val){ //数据为空处理
        return val ? val : '-';
    }

    componentWillMount (){
        myFetch.get('/building/getbui',{
            token:this.props.myStore.token
        }).then(res=> {
            if(res.code === 200){
                let data =res.data.items;
                
                //Promise执行异步操作 resolve执行成功回调 reject执行失败的回调
                let promises = data.map(item =>
                    new Promise(resolve =>{
                        myFetch.get('/building/getdir/'+item.id,{
                            token:this.props.myStore.token
                        }).then(res=> {
                            resolve(res);
                        })
                    })
                )
                
                Promise.all(promises).then(arr1 =>{
                    for(let i=0 ; i<data.length ; i++){
                        let equip = [];
                        for(let j=0 ; j<arr1[i].data.length ; j++){
                            if(arr1[i].data[j].name){
                                equip.push(arr1[i].data[j].name);
                            }
                        }
                        data[i]['equip'] = equip.join('，')
                    }
                    this.setState({
                         listData : data,
                         pageData : res.data._meta
                     })
                });
            }
        })
    }
    
    //分页请求
    pageChange(page){
        myFetch.get('/building/getbui',{
            token:this.props.myStore.token,
            page :page,
        }).then(res=> {
            if(res.code === 200){
                let data =res.data.items;
                
                //Promise执行异步操作 resolve执行成功回调 reject执行失败的回调
                let promises = data.map(item =>
                    new Promise(resolve =>{
                        myFetch.get('/building/getdir/'+item.id,{
                            token:this.props.myStore.token
                        }).then(res=> {
                            resolve(res);
                        })
                    })
                )
                
                Promise.all(promises).then(arr1 =>{
                    for(let i=0 ; i<data.length ; i++){
                        let equip = [];
                        for(let j=0 ; j<arr1[i].data.length ; j++){
                            if(arr1[i].data[j].name){
                                equip.push(arr1[i].data[j].name);
                            }
                        }
                        data[i]['equip'] = equip.join('，')
                    }
                    this.setState({
                         listData : data,
                         pageData : res.data._meta
                     })
                });
            }
        })
    }
    render (){
        const titleArr = [
            {name:'序号',size:'building-m-li'},
            {name:'楼宇名称',size:'building-l-li'},
            {name:'系统编号',size:'building-l-li'},
            {name:'楼宇序号',size:'building-l-li'},
            {name:'单元个数',size:'building-l-li'},
            {name:'注册业主数',size:'building-l-li'},
            {name:'物业管理人',size:'building-l-li'},
            {name:'管理人电话',size:'building-l-li'},
            {name:'绑定设备',size:'building-l-li'},
        ]
        let arr = [] , data =this.state.listData;
        for (let i=0 ;i<data.length ; i++){
            arr.push([
                {name:data[i].id,size:'building-m-li'},
                    {name:data[i].name,size:'building-l-li'},
                    {name:data[i].number,size:'building-l-li'},
                    {name:data[i].snumber,size:'building-l-li'},
                    {name:data[i].unit_num,size:'building-l-li'},
                    {name:this.returnNull(data[i].person_num),size:'building-l-li'},
                    {name:this.returnNull(data[i].realname),size:'building-l-li'},
                    {name:this.returnNull(data[i].phone),size:'building-l-li'},
                    {name:data[i].equip,size:'building-l-li'},
            ])
        }
        const lists = arr.map((item,index)=>
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