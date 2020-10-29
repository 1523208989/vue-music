import axios from 'axios'
export default (dissid) => {
  return axios.get(`/songListDetailApi`, {
    params: {
      id: dissid,
    }
  })
}