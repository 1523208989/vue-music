import axios from 'axios'
import getSecuritySign from './getSign'

export default (songmid) => {
  let data = { "req": { "module": "CDN.SrfCdnDispatchServer", "method": "GetCdnDispatch", "param": { "guid": "6876729600", "calltype": 0, "userip": "" } }, "req_0": { "module": "vkey.GetVkeyServer", "method": "CgiGetVkey", "param": { "guid": "6876729600", "songmid": [songmid], "songtype": [0], "uin": "1523208989", "loginflag": 1, "platform": "20" } }, "comm": { "uin": 1523208989, "format": "json", "ct": 24, "cv": 0 } }
  let sign = getSecuritySign(data)
  return axios.get('/audioApi', {
    params: {
      '-': 'getplaysongvkey' + (Math.random() + '').replace('0.', ''),
      g_tk: 5381,
      sign,
      loginUin: 1523208989,
      hostUin: 0,
      format: 'json',
      inCharset: 'utf8',
      outCharset: 'utf - 8',
      notice: 0,
      platform: 'yqq.json',
      needNewCode: 0,
      data
    }
  })
}