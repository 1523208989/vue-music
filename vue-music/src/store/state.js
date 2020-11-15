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
  HIS_search: storage.get('search', []),
  MINE_collect: storage.get('collect', []),
  MINE_history: storage.get('history', []),
  MINE_songList: storage.get('songList', [])
}