import React, { Component } from 'react';
import { Router,Route,hashHistory,IndexRedirect} from 'react-router';
import App from './App';
import { Provider } from 'mobx-react';
import myStore from './Store';
//控制台
import PropertyCompany from './components/propertyCompany/PropertyCompany';
import NewCompany from './components/propertyCompany/NewCompany';
// import CompanyList from './components/propertyCompany/CompanyList';

import Auditing from './components/auditing/Auditing';
import WaittingAuditing from './components/auditing/WaittingAuditing';
import AlreadyAuditing from './components/auditing/AlreadyAuditing';
import Equip from './components/equip/Equip';
import EquipList from './components/equip/EquipList';
import Property from './components/property/Property';
import PersonList from './components/property/PersonList';

import Building from './components/building/Building';
import NewBuilding from './components/building/NewBuilding';
import RoomManage from './components/building/RoomManage';

import Market from './components/buildingMarket/Market';
import NewMarket from './components/buildingMarket/NewMarket';
import MarketList from './components/buildingMarket/MarketList';

import Owner from './components/owner/Owner';
import OwnerList from './components/owner/OwnerList';

import Message from './components/message/Message';
import MessageLists from './components/message/MessageLists';
import MessageTemplate from './components/message/MessageTemplate';
import MessageHistory from './components/message/MessageHistory';

import Login from './components/login/Login';

class MyRouter extends Component {
  render() {
    return (
            <Provider {...myStore}>
                <Router history={hashHistory}>
                    <Route path='/' component={Login}/>
                    <Route path="/app" component={App}>
                        <IndexRedirect to='/new_company'/>
                        <Route path="/property_company" component={PropertyCompany}>
                            <IndexRedirect to='/new_company'/>
                            <Route path="/new_company" component={NewCompany}/>
                            {/* <Route path="/company_list" component={CompanyList}/> */}
                        </Route>
                        <Route path="/auditing" component={Auditing}>
                            <IndexRedirect to='/waitting_auditing'/>
                            <Route path="/waitting_auditing" component={WaittingAuditing}/>
                            <Route path="/already_auditing" component={AlreadyAuditing}/>
                        </Route>
                        <Route path="/equip" component={Equip}>
                            <IndexRedirect to='/equip_list'/>
                            <Route path="/equip_list" component={EquipList}/>
                        </Route>
                        <Route path="/property" component={Property}>
                            <IndexRedirect to='/person_list'/>
                            <Route path="/person_list" component={PersonList}/>
                        </Route>
                        <Route path="/building" component={Building}> 
                            <IndexRedirect to='/new_building'/>
                            <Route path="/new_building" component={NewBuilding}/>
                            <Route path="/room_manage" component={RoomManage}/>
                        </Route>
                        <Route path="/market" component={Market}>
                            <IndexRedirect to='/new_market'/>
                            <Route path="/new_market" component={NewMarket}/>
                            <Route path="/market_list" component={MarketList}/>
                        </Route>
                        <Route path="/owner" component={Owner}>
                            <IndexRedirect to='/owner_list'/>
                            <Route path="/owner_list" component={OwnerList}/>
                        </Route>
                        <Route path="/message" component={Message}>
                            <IndexRedirect to='/message_lists'/>
                            <Route path="/message_lists" component={MessageLists} />
                            <Route path="/message_template" component={MessageTemplate} />
                            <Route path="/message_history" component={MessageHistory}/>
                        </Route>
                    </Route>
                </Router>
            </Provider>
    )
  }
}

export default MyRouter;
