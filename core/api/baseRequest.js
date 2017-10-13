import api from './api'
import interceptor from './interceptor'

const NET_ERROR = 'NETWORK_ERROR'

const httpPost = function (host, url, self, params, successCallback, failCallBack, handleError) {
  if (!params) {
    params = {}
  }
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
  api(host).post(url, formData)
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
                self.$vux.toast.text(response.data.message)
              }
            }
          } else if (NET_ERROR === response.problem) {
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
  self.$vux.toast.text('获取数据失败')
  failCallBack && failCallBack(response.problem)
}

export default httpPost
