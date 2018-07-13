import React , { Component } from 'react';
import TitleList from '../public/TitleList';
import BodyList from '../public/BodyList';
import { Pagination } from 'antd';
import * as myFetch from '../../config/myFetch';
import Empty from '../../config/Empty';
import { inject , observer } from 'mobx-react';

@inject('myStore')
@observer

export default class RoomManage extends Component {
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
    componentDidMount(){
        myFetch.get('/house/gethus',{'token':this.props.myStore.token}).then(res =>{
            if(res.code === 200){
                let arr = [];
                let data = res.data.items;

                for(let i=0;i<data.length;i++){
                    arr.push(
                        [
                            {name: i+1,size:'room-m-li'},
                            {name:data[i].fname,size:'room-l-li'},
                            {name:data[i].snumber,size:'room-l-li'},
                            {name:data[i].name,size:'room-l-li'},
                            {name:data[i].floor_num,size:'room-l-li'},
                            {name:this.returnNull(data[i].realname),size:'room-l-li'},
                            {name:this.returnNull(data[i].phone),size:'room-l-li'},
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

    pageChange = (page) => {
        myFetch.get('/house/gethus',{token:this.props.myStore.token,page:page}).then(res=> {
            if(res.code === 200){
                let arr = [];
                let data = res.data.items;
                for(let i=0;i<data.length;i++){
                    arr.push(
                        [
                            {name: i+1,size:'room-m-li'},
                            {name:data[i].fname,size:'room-l-li'},
                            {name:data[i].snumber,size:'room-l-li'},
                            {name:data[i].name,size:'room-l-li'},
                            {name:data[i].floor_num,size:'room-l-li'},
                            {name:this.returnNull(data[i].realname),size:'room-l-li'},
                            {name:this.returnNull(data[i].phone),size:'room-l-li'},
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
            {name:'序号',size:'room-m-li'},
            {name:'房间编号',size:'room-l-li'},
            {name:'楼宇序号',size:'room-l-li'},
            {name:'所在单元',size:'room-l-li'},
            {name:'所在楼层',size:'room-l-li'},
            {name:'业主姓名',size:'room-l-li'},
            {name:'业主联系方式',size:'room-l-li'},
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