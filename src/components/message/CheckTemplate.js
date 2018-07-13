import React , { Component } from 'react';
import { Icon } from 'antd'; 
import { Pagination } from 'antd';
import * as myFetch from '../../config/myFetch';
import {inject,observer} from 'mobx-react';
import * as functions from '../../config/functions';
import Empty from '../../config/Empty';

@inject('myStore')
@observer

export default class CheckTemplate extends Component {
    constructor(props){
        super(props);
        this.state = {
            listData : [],
            pageData : ''
        }
    }

    componentDidMount (){
        myFetch.get('/messages',{
            token : this.props.myStore.token
        }).then(res => {
            if(res.code === 200){
                this.setState({
                    listData : res.data.items,
                    pageData : res.data._meta
                })
            }
        })
    }

    closeTemplate = () => {
        this.props.closeTemplate();
    }

    editIt = (obj)=>{ //编辑模板
        this.props.editMessage(obj);
    }

    pageChange = (page) => {
        myFetch.get('/messages',{
            token : this.props.myStore.token,
            page : page
        }).then(res => {
            if(res.code === 200){
                this.setState({
                    listData : res.data.items,
                    pageData : res.data._meta
                })
            }
        })
    }

    render (){
        const lists = this.state.listData.map((item,index) => 
        <li className="template-body-li" key={index}>
            <ul>
                <li className="template-title-s-li">{item.id}</li>
                <li className="template-title-m-li">{item.title}</li>
                <li className="template-title-l-li">{functions.cutLetters(item.content,16)}</li>
                <li className="template-title-m-li"><span onClick={this.editIt.bind(this,item)}>编辑</span></li>
            </ul>
        </li>
    )
        return (
            <div className="public-out-box">
                <div className="check-template-box">
                    <h2 className="new-file-title">消息模板</h2>
                    <Icon type="close-circle" className="public-close" onClick={this.closeTemplate}/>
                    <div className="template-inner-list">
                        <ul className="template-title-list">
                            <li className="template-title-s-li">序号</li>
                            <li className="template-title-m-li">标题</li>
                            <li className="template-title-l-li">内容</li>
                            <li className="template-title-m-li">操作</li>
                        </ul>
                        <ul className="template-body-list">
                            {this.state.listData.length > 0 ? lists : <Empty />}
                        </ul>
                    </div>
                    <div className="public-page">
                    {this.state.pageData ? <Pagination simple current={this.state.pageData.currentPage} total={parseInt(this.state.pageData.totalCount,0)} onChange={this.pageChange}/> : null }
                    </div>
                </div>
            </div>
        )
    }
}