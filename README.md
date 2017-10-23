# 盈峰微信前端框架

* 框架技术栈 Vue + Vuex + Vux + vue-router + Webpack

* 基于webpack + vue-loader + vux可以快速开发移动端页面，配合vux方便你在WeUI的基础上定制需要的样式。


## 框架优势

* 相比使用vue-cli构建项目，减少webpack的开发和维护成本，整个框架通过对webpack的完善可以直接作为一个项目生成器，每新建一个项目，不需要自己再去vue-cli搭建一个脚手架，整个框架模块化，基于module开发，每个项目相当于一个模块，我们只需要按着文件规则ctrl+c/v template项目，然后更改config的项目名称即可快速开发。 
* 项目已经完成WebpackConfig、WechatPlugin、ToastPlugin、Request框架、页面跳转Loading、防重复点击、Vuex、移动端适配等的配置和优化，方便后续开发。


## Mock-api集成
* 在server文件夹中有一个infore.json，根据规则配置出mock-api。
* 通过mock-api serve **/_dir目录/server开启mock服务。
* mock服务的默认地址：localhost:10086


# 项目布局

```
.
├── build                                       // webpack配置文件
├── config                                      // 项目打包路径
├── dist                                        // 上线项目文件，放在服务器即可正常访问
├── core                                        // 项目配置和核心代码，不基于项目
│   ├── api                                     // 请求框架
│   ├── config                                  // 基本配置
│   │   ├── loading.config.js                   // 页面切换loading配置
│   │   ├── setting.js                          // 项目配置
│   ├── utils 				                    // 工具
├── project                                     // 项目文件
│  	├── assert                                  // 会被webpack处理的文件
│   │   ├── css                                 // 样式
│   │   ├── images 				                // 项目用到的
│  	├── module                                  // 我们建立的不同的项目
│   │   ├── ...                                 // 不同的module目录
│  	│   │   ├──api							    // 具体请求和URL
│  	│   │   ├──component			            // 页面：pages+widget
│  	│   │   ├──moduleName.html			        // module入口html文件
│  	│   │   ├──moduleName.js			        // module入口文件，加载各种公共组件
│  	│   │   ├──moduleName.vue			        // module页面入口文件
│   ├── store                                   // vuex的状态管理
│   │   ├── index.js                            // 引用vuex，创建store
│   │   ├── modules                             // store模块
│   │   ├── mutation-types.js                   // 定义常量muations名
│   └── router                                  // 路由
│       └── moduleName.js                       // 各个module的路由
├── server                                      // mock服务
├── static                                      // 不被webpack处理的文件


```
## 开发流程
* npm install
* 更改core/config/setting.js里的```$ModuleName```，配置开发/打包的module，若配置为则```*```打出来全部module
* dev: npm run dev
* build: npm run build

## 盈峰环境-微信Web学习相关资料

#### *[Vue中文网](https://cn.vuejs.org/)*
#### *[vue-router中文网](https://router.vuejs.org/zh-cn/)*
#### *[vuex中文文档](https://vuex.vuejs.org/zh-cn/)*
#### *[vux移动端UI组件库](https://vux.li/)*
#### *[webpack中文文档](https://doc.webpack-china.org/)*

> 该框架纯粹Vue开发，了解前端知识，看vue就行，不多赘述。


