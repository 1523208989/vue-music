export default {
  playerGo({ commit }, {
    playList,
    flag,
    song,
    key
  }) {
    commit('setPlayList', playList)
    commit('setFullScroll', flag)
    commit('setSong',song)
    commit('setIndex', key)
  }
}