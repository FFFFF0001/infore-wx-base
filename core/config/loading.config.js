/**
 * vux：通过vuex配置loading
 * @param store
 * @param router
 */
const loadingConfig = function (store, router) {
  router.beforeEach(function (to, from, next) {
    store.commit('updateLoadingStatus', {isLoading: true})
    next()
  })

  router.afterEach(function (to) {
    setTimeout(() => {
      store.commit('updateLoadingStatus', {isLoading: false})
    }, normalConfLoadingTime)
  })
}

module.exports = loadingConfig

/**
 * 默认loading时间
 * @type {number}
 */
const normalConfLoadingTime = 300
