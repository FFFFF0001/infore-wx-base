/**
 * token拦截器
 * 422 - token失效
 */
const TOKEN_ERROR = '422'

export default {
  intercept: function (self, code) {
    if (code === TOKEN_ERROR) {
      self.$vux.toast.text('登录超时，请重新登录。', 'bottom')
      return true
    } else {
      return false
    }
  }
}
