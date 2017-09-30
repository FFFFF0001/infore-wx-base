var _USERID_ = ''
var _USERTOKEN_ = ''
var _USERNAME_ = ''
function setUserName (data) {
  _USERNAME_ = data
}

function getUserName () {
  return _USERNAME_
}

function setUserId (data) {
  _USERID_ = data
}

function getUserId () {
  return _USERID_
}

function setUserToken (data) {
  _USERTOKEN_ = data
}

function getUserToken () {
  return _USERTOKEN_
}

export default
{
  setUserName,
  getUserName,
  setUserId,
  getUserId,
  setUserToken,
  getUserToken
}

