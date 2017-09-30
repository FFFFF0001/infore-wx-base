/**
 * token拦截器
 * 422 - token失效
 */
const TOKEN_ERROR = '422'

export default {
  intercept: function (self, code) {
    if (code === TOKEN_ERROR) {
      // Toast.show('登录超时，请重新登录。', {
      //   duration: Toast.durations.LONG,
      //   position: -100
      // });

      self.$toast.bottom('登录超时，请重新登录。')
      return true
    } else {
      return false
    }
  }
}
