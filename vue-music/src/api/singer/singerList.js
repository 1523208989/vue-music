
import axios from 'axios'
export default function () {
  return axios.get('/singerListApi', {
    params: {
      '-': 'getUCGI' + (Math.random() + '').replace('0.', ''),
      g_tk: 369019720,
      sign: 'zzau0l5wkmvto2f3fef04bda3a286eeb40136f6b80f4a',
      loginUin: 0,
      hostUin: 0,
      format: 'json',
      inCharset: 'utf8',
      outCharset: ' utf-8',
      notice: 0,
      platform: 'yqq.json',
      needNewCode: 0,
      data: { "comm": { "ct": 24, "cv": 0 }, "singerList": { "module": "Music.SingerListServer", "method": "get_singer_list", "param": { "area": -100, "sex": -100, "genre": -100, "index": -100, "sin": 0, "cur_page": 1 } } }
    }
  })
}