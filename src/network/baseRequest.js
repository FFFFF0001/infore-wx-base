import VueResource from 'vue-resource'
import Vue from 'vue'
import interceptor from './interceptor'
import Urls from '../constants/Urls'
import api from './api'

import 'vue2-toast/lib/toast.css'
import Toast from 'vue2-toast'
Vue.use(Toast)
Vue.use(VueResource)

const NETERROR = 'NETWORK_ERROR'
// const WebServerUrl = 'http://192.168.31.151:8009'

export default {
  requestLogin: function (self, params, successCallback) {
    httpPost(Urls.login.userLogin, self, params, successCallback)
  },
  getMessageList: function (self, params, successCallback, failCallBack) {
    httpPost(Urls.message.getInforeMessageList, self, params, successCallback, failCallBack)
  }
}

function httpPost (url, self, params, successCallback, failCallBack, handleError) {
  if (!params) {
    params = {}
  }
  let userId
  if (!params.hasOwnProperty('userId')) {
    if (self.GLOBAL.getUserId()) {
      userId = self.GLOBAL.getUserId()
      Object.assign(params, {
        userId: userId
      })
    }
  }
  Object.assign(params, {
    // body里添加请求参数（默认每条消息服务器提供的）
    token: self.GLOBAL.getUserToken() || ''
  })

  console.log(params)

  let formData = new FormData()
  for (let prop in params) {
    if (Array.isArray(params[prop])) {
      for (let value of params[prop]) {
        formData.append(prop, value)
      }
    } else {
      formData.append(prop, params[prop])
    }
  }
  let headers
  if (self.GLOBAL.getUserToken()) {
    headers = {'Access-Token': self.GLOBAL.getUserToken()}
  } else {
    headers = {}
  }

  console.log(headers)

  api(self.Host, headers).post(url, formData)
    .then((response) => {
      console.log(response)
      const {status} = response
      if (response.ok) {
        if (response.status) {
          if (status === 200) {
            if (response.data.code === '0' || response.data.code === 0) {
              handleResponse(response.data, successCallback)
            } else {
              failCallBack && failCallBack(response.data.message)
              if (response.data.message) {
              // Toast.show(response.data.message, {
              //   duration: Toast.durations.LONG,
              //   position: -100
              // });
                self.$toast.bottom(response.data.message)
              }
            }
          } else if (NETERROR === response.problem) {
            _handleFail(self, failCallBack, response, handleError)
          }
        } else {
          _handleFail(self, failCallBack, response, handleError)
        }
      } else {
      // log('response.data.code:' + response.data.code);
        if (response.data && response.data.code) {
          if (!interceptor.intercept(self, response.data.code)) {
            _handleFail(self, failCallBack, response, handleError)
          }
        } else {
          _handleFail(self, failCallBack, response, handleError)
        }
      }
    })
}

function handleResponse (responseJson, successCallback) {
  if (!responseJson) {
    return
  }
  if (responseJson.code === '0' || responseJson.code === 0) {
    successCallback(responseJson.body)
  }
}

function _handleFail (self, failCallBack, response, handleError) {
  if (handleError) {
    handleError(response.problem)
    return
  }
  // Toast.show('获取数据失败', {
  //   duration: Toast.durations.LONG,
  //   position: -100
  // });
  self.$toast.bottom('获取数据失败')
  failCallBack && failCallBack(response.problem)
}
