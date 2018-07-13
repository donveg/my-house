function canSave (...items){
    let flag = true;
    for (let i = 0 ; i<items.length ; i++){
        if(!items[i]){
            flag = false ;
        }
    } 
    return flag ;
}
function cutTimeMinutes (num){
    let date = new Date(num*1000);
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();
    let hours = date.getHours();
    let min = date.getMinutes();
    if(month < 10){
        month = '0' + month;
    }
    if(day < 10 ){
        day = '0' + day ;
    }
    if(hours < 10){
        hours = '0' +hours;
    }
    if(min < 10){
        min = '0' + min;
    }
    return year+'-'+month+'-'+day+' '+hours+':'+min;
}

function cutTimeDate (num){ //时间戳转时间 y-m-d
    let date = new Date(num*1000);
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();
    if (month<10) month = '0'+month;
    if (day<10) day = '0'+day;
    return year+'-'+month+'-'+day;
}

let cutLetters = (str) => str.length > 10 ? str.substr(0,10)+'...' : str ;

export {canSave,cutTimeMinutes,cutTimeDate,cutLetters}