import {
  UPDATE_LOADING_STATUS
} from '../mutation-types'

// 该模块的初始状态
const state = {
  isLoading: false
}
// 相关的 mutations
const mutations = {
  [UPDATE_LOADING_STATUS] (state, payload) {
    state.isLoading = payload.isLoading
  }
}

export default {
  state,
  mutations
}
