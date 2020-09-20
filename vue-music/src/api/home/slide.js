import axios from 'axios'

export default function () {
  return axios.get("/slideApi", {
    params: {
      g_tk_new_20200303: 5381,
      g_tk: 5381,
      loginUin: 0,
      hostUin: 0,
      format: 'json',
      inCharset: 'utf8',
      outCharset: 'utf-8',
      notice: 0,
      platform: 'yqq.json',
      needNewCode: 0,
      cmd: 'pc_index_new',
    }
  })
}
