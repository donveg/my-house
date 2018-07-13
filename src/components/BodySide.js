import React , { Component } from 'react';
import TitleBar from './TitleBar';

export default class BodySide extends Component{
    render(){
        return(
            <div className="body-box">
                <TitleBar />
                <div className="view-box">
                    
                </div>
            </div>
        )
    }
}