import React , { Component } from 'react';

export default class TitleList extends Component{
    render(){
        const list = this.props.data.map((item,index) => 
           <li className={item.size} key={index}>{item.name}</li>
        ) ;
       // console.log(list);
        return (
            <ul className="public-title-list">
                {list}
            </ul>
        );
    }
}