import httpPost from '../../../../core/api/baseRequest'
import Urls from './Urls'

export const requestLogin = function (self, params, successCallback, failCallBack, handleError) {
  httpPost(Urls.base, Urls.login.userLogin, self, params, successCallback, failCallBack, handleError)
}
