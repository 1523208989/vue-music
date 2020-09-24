import axios from 'axios'
import './detailSign' //歌手详情页请求参数sign值生成函数

export default (id) => {
  let data = { "comm": { "ct": 24, "cv": 0 }, "singerSongList": { "method": "GetSingerSongList", "param": { "order": 1, "singerMid": id, "begin": 0, "num": 10 }, "module": "musichall.song_list_server" } }
  let str = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let count = Math.floor(Math.random() * 7 + 10);
  let sign = 'zza';
  for (let i = 0; i < count; i++) {
    sign += str[Math.floor(Math.random() * 36)];
  }
  sign += window.__sign_hash_20200305('CJBPACrRuNy7' + JSON.stringify(data));
  return axios.get(`/singerDetailApi/${id}`, {
    params: {
      '-': 'getSingerSong' + (Math.random() + '').replace('0.', ''),
      g_tk: 5381,
      sign,
      loginUin: 0,
      hostUin: 0,
      format: 'json',
      inCharset: 'utf8',
      outCharset: 'utf-8',
      notice: 0,
      platform: ' yqq.json',
      needNewCode: 0,
      data
    }
  })
}