import website from './website';
import $ from 'jquery';
const headers = {
    'Accept': 'application/json', 
    'Content-Type': 'application/x-www-form-urlencoded',
}
function getUrl (fecthUrl,query){
    let url = fecthUrl;
    if(query){
        let params = '';
        for (let key in query){
            params += `&${key}=${query[key]}`;
        }
        params = params.substr(1);
        url = `${fecthUrl}?${params}`
    }
    return url ;
}
export function get (fecthUrl,query){
    let url = getUrl(fecthUrl,query);
    return fetch(website+url).then(res=>{
        return res.json()
    })
}
export function post (fecthUrl,body,query){
    let url = getUrl(fecthUrl,query);
    return fetch(website+url,{
        method :'POST',
        headers:new Headers(headers),
        body:$.param(body)
    }).then(res =>{
        return res.json()
    })
}
export function put (fecthUrl,body,query){
    let url = getUrl(fecthUrl,query);
    return fetch(website+url,{
        method :'PUT',
        headers:new Headers(headers),
        body:$.param(body)
    }).then(res =>{
        return res.json()
    })
}
export function deleteIt (fecthUrl,query){
    let url = getUrl(fecthUrl,query);
    return fetch(website+url,{
        method : "DELETE"
    }).then(res=>{
        
    })
}