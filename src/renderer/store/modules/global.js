const TOGGLE_NAVI = 'TOGGLE_NAVI'

const state = {
  showNavigation: false
}

const mutations = {
  [TOGGLE_NAVI]: (state) => {
    state.showNavigation = !state.showNavigation
  },
}

const actions = {
  toggleNavi({ commit }) {
    commit(TOGGLE_NAVI)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
