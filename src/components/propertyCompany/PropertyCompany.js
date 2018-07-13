import React , { Component } from 'react';
import TitleBar from '../TitleBar';
import '../../control.css'; //引入控制台专有样式

export default class Auditing extends Component {
    render (){
        return (
            <div className="body-box">
                <TitleBar />
                <div className="view-box">
                    {this.props.children}
                </div>
            </div>
        )
    }
}