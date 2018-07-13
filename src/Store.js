import { observable , action} from 'mobx';

class MyStore{
    @observable NavList = [
        {name : '控制台' , path:'property_company', activeName:'newCompany', logo : 'property_company' ,hoverLogo : 'property_company_hover' ,sonArr : [{name:'应答开门',path:'new_company'}]},
        //{name : '控制台' , path:'property_company', activeName:'newCompany', logo : 'property_company' ,hoverLogo : 'property_company_hover' ,sonArr : [{name:'应答开门',path:'new_company'},{name:'远程管理',path:'company_list'}]},
        {name : '审核' , path:'auditing', activeName:'waittingAuditing', logo : 'auditing' ,hoverLogo : 'auditing_hover' ,sonArr : [{name:'待审列表',path:'waitting_auditing'},{name:'已审列表',path:'already_auditing'}]},
        {name : '设备' , path:'equip', activeName:'equip', logo : 'equip' ,hoverLogo : 'equip_hover' ,sonArr : [{name:'设备列表',path:'equip_list'}]},
        {name : '物业人员' , path:'property', activeName:'newFile', logo : 'property' ,hoverLogo : 'property_hover' ,sonArr : [{name:'人员列表',path:'person_list'}]},
        {name : '楼宇' , path:'building', activeName:'newBuilding', logo : 'building' ,hoverLogo : 'building_hover' ,sonArr : [{name:'楼宇列表',path:'new_building'},{name:'房间列表',path:'room_manage'}]},
        {name : '住户' , path:'owner', activeName:'owner', logo : 'owner' ,hoverLogo : 'owner_hover' ,sonArr : [{name:'住户列表',path:'owner_list'}]},
        {name : '消息' , path:'message', activeName:'message', logo : 'message' ,hoverLogo : 'message_hover' ,sonArr : [{name:'消息列表',path:'message_lists'},{name:'消息模板',path:'message_template'},{name:'发送消息',path:'message_history'}]},
    ];
    @observable secondTitle = sessionStorage.getItem('titleName') || '审计' ;
    @observable secondArr = [];
    @observable secondTitle = sessionStorage.getItem('titleName') || '控制台' ;
    @observable secondArr = this.secondTitle === '控制台' ? [{name:'应答开门',path:'new_company'},{name:'远程管理',path:'company_list'}] : [];
    @action changeTitle (name){
        this.secondTitle = name ;
        for (let i=0 ; i<this.NavList.length ; i++){
            if(this.NavList[i].name === this.secondTitle){
                this.secondArr = this.NavList[i].sonArr ;
            }
        }
    }
    @action changeArr (arr){
        this.secondArr = arr ;
    }
    @observable token = sessionStorage.getItem('token');
}
export default {
    myStore : new MyStore()
}