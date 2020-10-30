export default {
  playerGo({ commit, state }, {
    song,
    index
  }) {
    if (song.audioUrl) {
      commit('setSong', song)
      commit('setIndex', index)
    }
    if (!song.audioUrl) commit('setError', true)
    if (state.minPlayer === false) commit('setMinPlayer', true)
    commit('setFullScroll', !!song.audioUrl)
  },
}