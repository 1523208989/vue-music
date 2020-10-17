import axios from 'axios'

export default (songList) => {
  let lyricList = songList.map(item => {
    return axios.get(`/lyricApi`, {
      params: {
        songmid: item.mid,
      }
    })
  })
  return Promise.all(lyricList)
}