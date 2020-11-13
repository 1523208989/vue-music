import storage from 'good-storage'
export default {
  singer: {},
  fullScroll: false,
  playList: [],
  song: {},
  index: -1,
  error: false,
  play: false,
  mode: 0,
  minPlayer: false,
  HIS_search: storage.get('search', [])
}