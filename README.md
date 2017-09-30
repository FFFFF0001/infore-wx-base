# sell

> sell app

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


assets======图片与样式
components============存放页面与组件
components/pages===========存放路由中配置的各个界面
components/widget===========存放页面中重复的组件
config===================存放配置项目全局信息的代码
constants================存放各个url地址等常量
network==================存放网络请求相关的代码
network/api.js==============存放创建请求api并传入请求头信息的代码
network/baseRequest.js==============存放发起请求的代码与请求接口调用的代码
network/interceptor.js==============存放网络拦截器的代码
router/index.js===============存放配置路由信息的代码
utils=========================存放公用的工具代码的方法
App.vue=======================根界面
main.js=======================主页配置
