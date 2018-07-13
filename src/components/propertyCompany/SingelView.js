import React,{Component} from 'react';
export default class SingelView extends Component{
    render(){
        return(
            <div className='remote-detail'>
                <p className='align-center'>1单元</p>
                <div>
                    <span>前门：</span>
                    <button className='btn btn-video'>远程视频</button>
                    <button className='btn btn-open'>直接开门</button>
                </div>
                <div>
                    <span>后门：</span>
                    <button className='btn btn-video'>远程视频</button>
                    <button className='btn btn-open'>直接开门</button>
                </div>
            </div>
                            
        )
    }
}