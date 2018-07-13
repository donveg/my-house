import React , { Component } from 'react';
// import MessListBox from './MessListBox';
// import MoutilView from './MoutilView';
export default class CompanyList extends Component {
    render (){
        return (
            <div>
                {/* 控制台请求列表 */}
                {/* <MessListBox /> */}
                {/* 远程管理列表 */}
                <div className='remote-manage-box public-auto'>
                    <ul>
                        {/* <MoutilView /><MoutilView /> */}
                    </ul>
                </div>
            </div>
        )
    }
}