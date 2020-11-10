import axios from 'axios'
export default (w) => {

  return axios.get('/searchKeyApi', {
    params: {
      ct: 24,
      qqmusic_ver: 1298,
      new_json: 1,
      remoteplace: ' txt.yqq.song',
      searchid: Math.random().toString().replace('0.',''),
      t: 0,
      aggr: 1,
      cr: 1,
      catZhida: 1,
      lossless: 0,
      flag_qc: 0,
      p: 1,
      n: 20,
      w,
      g_tk_new_20200303: 5381,
      g_tk: 5381,
      loginUin: 1523208989,
      hostUin: 0,
      format: 'json',
      inCharset: 'utf8',
      outCharset: ' utf-8',
      notice: 0,
      platform: ' yqq.json',
      needNewCode: 0,
    }
  })
}