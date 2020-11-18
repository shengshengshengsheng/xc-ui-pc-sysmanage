import http from './../../../base/api/public'
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;

//页面查询
export const page_list = (page,size,params) =>{
  //将json对象转为key/value键值对
  let query = querystring.stringify(params);
  //请求服务端的页面查询接口
  return http.requestQuickGet(apiUrl+'/cms/page/list/'+page+'/'+size + '/?' + query);
}

//页面添加
export const page_add = params =>{
  //请求服务端的页面查询接口
  return http.requestPost(apiUrl+'/cms/page/add/',params);
}

//页面编辑
export const page_edit = (id,params) =>{
  //请求服务端的页面查询接口
  return http.requestPut(apiUrl+'/cms/page/edit/' + id,params);
}

//页面查询
export const page_get = id =>{
  //请求服务端的页面查询接口
  return http.requestQuickGet(apiUrl+'/cms/page/get/' + id);
}

//页面删除
export const page_del = id =>{
  return http.requestDelete(apiUrl + '/cms/page/del/' + id);
}

//发布页面
export const page_postPage= id => {
  return http.requestPost(apiUrl+'/cms/page/postPage/'+id)
}


