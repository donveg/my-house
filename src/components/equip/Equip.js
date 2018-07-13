import React , { Component } from 'react';
import TitleBar from '../TitleBar';

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