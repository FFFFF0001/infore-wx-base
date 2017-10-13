/**
 * 项目名（同app.json里的name值要一致）
 * node 运行项目路径下script/dev.js会自动修改，不需要手动修改。
 * @type {{$AppProjectName: string}}
 */

let conf = require('../../config')
export let config = {
  $ModuleName: conf.module.name
}
/**
 * 项目全局变量初始化（默认userId，token，有需要自己添加）
 * @type {{_USERID_: string, _USERTOKEN_: string}}
 */
export let GLOB = {
  _USERID_: '',
  _USERTOKEN_: ''
}

/**
 * 用户信息key:用户storage存取数据
 * @type {{USERSTAGE_KEY: string}}
 */
export const USER_KEY = {
  USERSTAGE_KEY: 'INFROREUSERSTATEKEY',
}

if (process.env.NODE_ENV === 'production') {
  // 生产环境
  Object.assign(config, {
    WebServerUrl: 'https://epms.infore.com',
  })
} else {
  // 开发环境
  Object.assign(config, {
    WebServerUrl: 'https://epms.infore.com',
  })
}
