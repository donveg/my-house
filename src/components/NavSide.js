import React,{ Component } from 'react';
import { Link } from 'react-router';
import * as img from '../config/img'; 
import {Avatar} from 'antd';
import { inject , observer} from 'mobx-react'; 

@inject('myStore') //注入需要的stone
@observer //监听数据
export default class NavSide extends Component {

    constructor (props){ //初始化构造函数
        super(props)
        this.state = {
            active : sessionStorage.getItem('activeName') || 'waittingAuditing'
        }
    }
     changeActive(str,name){
        sessionStorage.setItem('activeName',str);
        sessionStorage.setItem('titleName',name);
        this.props.myStore.changeTitle(name);
        this.setState({
            active : str
        })
     }

    render(){
        const list = this.props.myStore.NavList.map((item,index)=>
            <li key={index}>
                <Link to={'/'+item.path} activeClassName ='on' onClick={this.changeActive.bind(this,item.activeName,item.name)}>
                    <img src={this.state.active === item.activeName ? img[item.hoverLogo] : img[item.logo]} alt=""/>
                    <span>{item.name}</span>
                </Link>
            </li>
        );
        return(
            <div className="nav-box">
                <div className='head-info'>
                    <Avatar size='large' icon="user" className="head-pic"/>
                    <b>Asshole</b>
                </div>
                <ul className="nav-list">
                    {list}
                </ul>
            </div> 
            
        );
    }
}

