/**
 * @description 公共方法
 * @author simple
 * @date 2018/10/30 10:01
 */
import axios from 'axios'
import Qs from 'qs'
import {getLocalToken} from 'common/js/cache'
export function fetch (url, param) {
  //参数
  param = Qs.stringify(param);
  let token=getLocalToken()==undefined?"Not login":getLocalToken();
  console.log(token);
  return new Promise((resolve, reject) => {
    axios.post(url,param,{
      headers:{
        'token':token
      }
    }).then(response=>{
      resolve(response.data);
    },err => {
      reject(err);
    }).catch((error) => {
      reject(error);
    })
  })
}

