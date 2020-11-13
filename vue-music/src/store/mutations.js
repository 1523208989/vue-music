export default {
  setSinger(state, item) {
    state.singer = item
  },
  setPlayList(state, item) {
    state.playList = item
  },
  setFullScroll(state, item) {
    if (state.fullScroll !== item) state.fullScroll = item
  },
  setSong(state, item) {
    if (state.song.mid !== item.mid) state.song = item
  },
  setIndex(state, item) {
    if (state.index !== item) state.index = item
  },
  setMode(state, item) {
    state.mode = item
  },
  setPlay(state, item) {
    if (state.play !== item) state.play = item
  },
  setError(state, item) {
    if (state.error !== item) state.error = item
  },
  setMinPlayer(state, item) {
    if (state.minPlayer !== item) state.minPlayer = item
  },
  setHIS_search(state, item) {
    state.HIS_search = item
  }
}