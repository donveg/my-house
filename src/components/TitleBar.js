import React , { Component } from 'react';
import { inject ,observer } from 'mobx-react';
import { Link ,hashHistory } from 'react-router';
import { message } from 'antd';
import * as myFetch from '../config/myFetch';

@inject('myStore')
@observer

export default class TitleBar extends Component {

    componentWillMount(){ //解决刷新子页面链接消失
        for(let i=0 ;i<this.props.myStore.NavList.length ; i++){
            if(this.props.myStore.NavList[i].name === this.props.myStore.secondTitle){
                this.props.myStore.changeArr(this.props.myStore.NavList[i].sonArr);
            }
        }
    }
    loginOut = () => {
        myFetch.get('/site/loginout',{
            token : this.props.myStore.token
        }).then(res => {
            if(res.code === 200){
                message.success('退出登录成功!');
                this.props.myStore.secondTitle = '控制台';
                this.props.myStore.secondArr = [{name:'应答开门',path:'new_company'},{name:'远程管理',path:'company_list'}];
                hashHistory.push('/');
            }
        })
    }

    render (){
        const list = this.props.myStore.secondArr.map((item,index)=>
        <li key={index}><Link to={item.path} activeClassName='on'>{item.name}</Link></li>
    )
    return (
        <div className="title-bar">
            <h2 className="title-font">{this.props.myStore.secondTitle}</h2>
            <ul className="title-font-list">
                {list}
            </ul>
            <span className="back-login" onClick={this.loginOut}></span>
        </div>
    )
    }
}