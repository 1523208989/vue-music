import axios from 'axios'

export default (dissid)=>{
 return axios.get(`/songListDetailApi`,{
   params:{
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    new_format: 1,
    disstid: dissid,
    g_tk_new_20200303: 5381,
    g_tk: 5381,
    loginUin: 1523208989,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0,
   }
 })
}