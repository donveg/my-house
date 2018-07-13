import React , { Component } from 'react';
import TitleList from '../public/TitleList';
import BodyList from '../public/BodyList';
import { Pagination } from 'antd';
import PersonEdit from './PersonEdit';
import * as myFetch from '../../config/myFetch';
import {inject,observer} from 'mobx-react';
import Empty from '../../config/Empty';

@inject('myStore')
@observer

export default class PersonList extends Component {
    constructor(props){
        super(props);
        this.state ={
            listData : [],
            pageData : '',
            edit :false,
            editData : '',
        }
    }

    returnNull(val){ //数据为空处理
        return val ? val : '-';
    }

    componentDidMount(){
        myFetch.get('/properyuser/getlist',{
            'token':this.props.myStore.token,
        }).then(res =>{
            if(res.code === 200){
                let data = res.data.items;
                let promises  = data.map(item =>
                    new Promise(resolve =>{
                        myFetch.get('/properyuser/getinfo/'+item.pid,{
                            token : this.props.myStore.token,
                        }).then(res =>{
                            resolve(res)
                        });
                    })
                );
                Promise.all(promises).then(arr1 =>{
                    for(let i=0; i<data.length ;i++){
                        let range = [];
                        let rangeId = [];
                        for(let j=0; j<arr1[i].data.length; j++){
                            if(arr1[i].data[j].name){
                                range.push(arr1[i].data[j].name);//管理范围名字
                                rangeId.push(arr1[i].data[j].id); //管理范围id
                            }
                        }
                        data[i]['purview'] = range.join('，');
                        data[i]['purviewId'] = rangeId.join(',');
                    }
                    this.setState({
                        listData :data,
                        pageData : res.data._meta,
                    });
                });
            }
        });
    }

    pageChange=(page)=>{
        myFetch.get('/properyuser/getlist',{
            'token':this.props.myStore.token,
            'page' : page,
        }).then(res =>{
            if(res.code === 200){
                let data = res.data.items;
                let promises  = data.map(item =>
                    new Promise(resolve =>{
                        myFetch.get('/properyuser/getinfo/'+item.pid,{
                            token : this.props.myStore.token,
                        }).then(res =>{
                            resolve(res)
                        });
                    })
                );
                Promise.all(promises).then(arr1 =>{
                    for(let i=0; i<data.length ;i++){
                        let range = [];
                        let rangeId = [];
                        for(let j=0; j<arr1[i].data.length; j++){
                            if(arr1[i].data[j].name){
                                range.push(arr1[i].data[j].name);//管理范围名字
                                rangeId.push(arr1[i].data[j].id); //管理范围id
                            }
                        }
                        data[i]['purview'] = range.join('，');
                        data[i]['purviewId'] = rangeId.join(',');
                    }
                    this.setState({
                        listData :data,
                        pageData : res.data._meta,
                    });    
                });
            }
        });
    }

    
    openEditBox = id =>{
        if(id){
            myFetch.get('/properyusers/'+id,{
                token : this.props.myStore.token
            }).then(res => {
                if(res.code === 200){
                    this.setState({
                        edit : true,
                        editData : res.data
                    })
                }
            })
        }
    }
    updateList = () => {
        myFetch.get('/properyuser/getlist',{
            'token':this.props.myStore.token,
            'page' : this.state.pageData.currentPage,
        }).then(res =>{
            if(res.code === 200){
                let data = res.data.items;
                let promises  = data.map(item =>
                    new Promise(resolve =>{
                        myFetch.get('/properyuser/getinfo/'+item.pid,{
                            token : this.props.myStore.token,
                        }).then(res =>{
                            resolve(res)
                        });
                    })
                );
                Promise.all(promises).then(arr1 =>{
                    for(let i=0; i<data.length ;i++){
                        let range = [];
                        let rangeId = [];
                        for(let j=0; j<arr1[i].data.length; j++){
                            if(arr1[i].data[j].name){
                                range.push(arr1[i].data[j].name);//管理范围名字
                                rangeId.push(arr1[i].data[j].id); //管理范围id
                            }
                        }
                        data[i]['purview'] = range.join('，');
                        data[i]['purviewId'] = rangeId.join(',');
                    }
                    this.setState({
                        listData :data,
                        pageData : res.data._meta,
                        edit : false
                    });    
                });
            }
        });
    }
    closeEditBox = () =>{
        this.setState({
            edit :false
        })
    }
    render (){
        const titleArr = [
            {name:'序号',size:'person-m-li'},
            {name:'姓名',size:'person-l-li'},
            {name:'账号',size:'person-l-li'},
            {name:'联系电话',size:'person-l-li'},
            {name:'管理范围',size:'person-l-li'},
            {name:'操作',size:'person-l-li'}
        ]
        let arr = [] , data =this.state.listData;
        for (let i=0 ;i<data.length ; i++){
            arr.push(
                [
                    {name:data[i].pid,size:'person-m-li'},
                    {name:data[i].realname,size:'person-l-li'},
                    {name:data[i].username,size:'person-l-li'},
                    {name:this.returnNull(data[i].phone),size:'person-l-li'},
                    {name:this.returnNull(data[i].purview),size:'person-l-li'},
                    {name:<p><span className="public-list-button" onClick={this.openEditBox.bind(this,data[i].pid)} >编辑</span></p>,size:'person-l-li'}
                ]
            )
        }
       
        const lists = arr.map((item,index)=>
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
                    <Pagination current={this.state.pageData.currentPage} total={parseInt(this.state.pageData.totalCount,0)}  onChange={this.pageChange} hideOnSinglePage={true} pageSize ={parseInt(this.state.pageData.perPage,0)} />,
                    </div> : null
                }
            </div>
            {this.state.edit ? <PersonEdit editData = {this.state.editData} closeEditBox ={this.closeEditBox} updateList={this.updateList}/> : null}
        </div>
        )
    }
}