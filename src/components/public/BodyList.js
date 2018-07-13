import React , { Component } from 'react';

export default class BodyList extends Component {
    render (){
        const list = this.props.data.map((item,index)=>
            <li key={index} className={item.size}>{item.name}</li>
        )
        return (
            <ul className="public-body-list">
                {list}
            </ul>
        )
    }
}