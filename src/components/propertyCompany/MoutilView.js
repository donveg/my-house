import React,{Component} from 'react';
import SingelView from './SingelView';
export default class MoutilView extends Component{
    render(){
        return(
            <li>
                <h3>望江楼（1栋）</h3>
                <SingelView /><SingelView /><SingelView />
            </li>
                  
        )
    }
}