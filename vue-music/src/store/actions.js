export default {
  playerGo({ commit, state }, {
    playList,
    flag,
    song,
    key
  }) {

      commit('setSong', song)
      commit('setIndex', key)

    commit('setPlayList', playList)
    commit('setFullScroll', flag)
  },
}