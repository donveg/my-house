import React , { Component } from 'react';
import NewSent from './NewSent';
import MessageList from './MessageList';
export default class WaittingAuditing extends Component {
    constructor(props){
        super(props);
        this.state = {
            show :'add',
        }
    }
    showBox = str =>{
        this.setState({
            show :str,
        });
    }
    render (){
        return (
            <div className="public-body">
                <div className="public-button-group">
                    <span onClick={this.showBox.bind(this,'add')} className={this.state.show === 'add' ? 'on' :null}>新增</span>
                    <span onClick={this.showBox.bind(this,'list')} className={this.state.show === 'list' ? 'on': null}>队列</span>
                </div>
                {this.state.show === 'add' ? <NewSent /> :<MessageList />}
            </div>
        )
    }
}