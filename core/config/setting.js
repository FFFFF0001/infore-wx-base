/**
 * moduleName，在这里更改开发/打包的module
 * 若配置为 * 则打出来全部module
 * @type {{$AppProjectName: string}}
 */
let config = {
  $ModuleName: '*'
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

module.exports = config
