import React , { Component } from 'react';
import * as img from './img';

export default class Empty extends Component {
    render (){
        return (
            <div className="empty-box">
                <img src={img.empty} alt=""/>
            </div>
        )
    }
}