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


assets======图片与样式<br>
components============存放页面与组件<br>
components/pages===========存放路由中配置的各个界面<br>
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


环境准备

主要是一些全局的nodejs包

Nodejs
npm
webpack
less
sudo npm install webpack -g  // -g 代表全局安装webpack，调出命令行即可使用webpack命令
sudo npm install less -g     // -g 全局安装 less to css 转换器

开始

1. 初始化工程

创建工程文件夹 new 并定位到 new

mkdir new && cd new

使用npm初始化工程

npm init

根据需要设置项目的信息， 也可以一路回车，使用默认信息，默认项目名称为文件夹名（项目名称不要设置成某个模块名，否则将来你引用摸个模块的时候会报错）

name: (new)
version: (1.0.0)
description:
entry point: (index.js)
test command:
git repository:
keywords: new
author: fz
license: (ISC)


{
  "name": "gt",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "new"
  ],
  "author": "fz",
  "license": "ISC"
}

Is this ok? (yes)

之后文件夹下会生成一个package.json,记录了项目的详细信息，包括了各种依赖和插件。

2. 创建目录以及webpack配置文件

├── dist            // 编译之后输出文件的目录
├── src             // 应用逻辑代码存放区域
│   ├── lib        // 存放npm上找不到的第三方库
│   │   ├── backbone.js
│   │   └── underscore.js
│   ├── static     // 存放静态资源
│   │   └── logo.png
│   ├── app.html   // 部件模板
│   ├── app.js     // 部件代码
│   └── app.less   // 部件样式
├── index.html      // 应用首页模板
├── index.js        // 应用入口
├── package.json    // 工程配置文件
└── webpack.config.js  // webpack配置文件

现在的目录结构，文件都是空白的，等一下把他们补上。

3. 安装webpack各中模块的loader（加载器）和插件以及我们需要的模块

npm install --save less          // 本地按装less
npm install --save less-loader   // less模块的加载器，配合下面css-loader 和 style-loader
npm install --save css-loader    // css 模块加载器
npm install --save style-loader  // 以上两个插件的根基
npm install --save url-loader    // 用来处理 图片 字体 的模块，是由下面file-loader封装的。可自定义文件名
npm install --save file-loader
npm install --save html-loader   // 加载html文件用的
npm install --save text-loader   // 加载纯文本用的
npm install --save html-webpack-plugin           // 生成html文件插件
npm install --save extract-text-webpack-plugin   // 单独提取css文件插件
npm install --save webpack                       // 提供webpack对象
npm install --save webpack-dev-server            // webpack-server开发包，方便调试
npm install --save vue
npm install --save jquery

4. 完成后的package.json

{
  "name": "new",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "webpack-dev-server --hot --inline",   // 用户启动 webpack-dev-server 用于用户调试 --hot 代表热替换 ， --inline 模式。。不太清楚。
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "new"
  ],
  "author": "fz",
  "license": "ISC",
  "dependencies": {
    "bootstrap": "^3.3.6",
    "css-loader": "^0.23.1",
    "extract-text-webpack-plugin": "^1.0.1",
    "file-loader": "^0.9.0",
    "html-loader": "^0.4.3",
    "html-webpack-plugin": "^2.22.0",
    "jquery": "^2.1.4",
    "less": "^2.7.1",
    "less-loader": "^2.2.3",
    "style-loader": "^0.13.1",
    "text-loader": "0.0.1",
    "url-loader": "^0.5.7",
    "vue": "^1.0.26",
    "webpack": "^1.13.1",
    "webpack-dev-server": "^1.14.1"
  }
}

3. 编写webpack.config.js配置文件

webpack配置文件比较复杂，需要做一下说明：webpack作为一款模块打包器，其管理的单元就是模块，webpack的模块指的不仅仅是js，包括了样式，图片，字体，模板等等。不同的模块需要相应的loader作为加载器进行加载。

var webpack = require('webpack');
var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');
var extractTextWebpackPlugin = require('extract-text-webpack-plugin');

引入必要的插件和模块

module.exports = {
    entry: {
        "index": "./index.js",
        "common": ['vue', 'jquery', 'underscore', 'backbone']
    },

entry 顾名思义就是入口，他是程序的入口，但它同时也是chunk（代码块）构造器。构造有两种方式，上面一种，通过文件内require的模块关系，将文件打包成chunk。下面一种意思就是组成这个chunk的是这几个模块（backbone，underscore等三方模块的定义在下面， vue，jquery，可以直接通过npm安装）。
这个配置会编译出两个文件，一个当作公共库使用，一个当作网站入口使用。

    output: {
        path: './dist',
        publicPath: '/path/',
        filename: '[name].[hash].js'
    },

很明显，这里是输出文件控制

path: 输出编译后文件路径
publicPath: 在html-webpack-plugin中，中引入脚本的根目录。（生成）
filename: 输出文件名，[name]的意思就是原来chunk代码块叫什么名字就是什么名字，[hash]，文件的哈希值。
例如: 入口文件名叫index，那么它的输出就是index.d87f87sd6fsdgs76gsd967.js
    module: {
        loaders: [
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            },
            {
                test: /\.less$/,
                loader: extractTextWebpackPlugin.extract("style-loader", "css-loader!less-loader")
                // 配合‘extract-text-webpack-plugin’可以剥离，css
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(png|jpg|gif|woff|woff2|ttf|eot|svg)$/,
                loader: 'url-loader?limite=8192'   // limit 是转换base64的文件大小的阀值8兆
            },
            {
                test: /\.html$/,
                loader: 'html-loader'    // 可以用来加载模板
            }
        ]
    },

module 这部分，我不是很了解，只知道这里可以用于loader定义。loaders是一个数组。

test: 定义加载模块的文件名正则表达式
loader: 定义加载模块的加载器
加载器可以多个配合使用，典型的就是style css less，逻辑还是很清晰的，less 转 css 转 样式模块，然后插入文档。

    resolve: {
        root: [
            path.resolve(__dirname, 'src/lib')
        ],
        extensions: ['', '.js'],
        alias: {
            'underscore': 'underscore.js',
            'backbone': 'backbone.js',
        }
    },

解析模块功能，用来解析三方模块和一些require不方便的模块。

root: 模块搜索路径数组，告诉webpack从哪里去找模块。我这里定义了一个src/lib路径，我把一些库放在这个路径下面。引用的时候，可以直接require(‘underscore.x.x.x.js’);不必加路径。
extensions: 拓展名，设置扩展名后，可以require(‘underscore’)，不必加.js，这里一定要设置，否则，webpack-dev-server 会报错，真心坑爹。
alias: 经过上面的设置，已经可以随心所欲引入三方模块了，但是我觉得使用别名的方式更好，更方便管理。在文件中引用公共库的时候避免使用路径的方式，例如require(‘../../lib/ssssss.js’)。在别名中定义好即可。
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: '[name].[hash].js',
            chunks: ['index', 'common']    // extract commonChunk  from index & common
        }),
        new htmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            chunks: ['index', 'common']
        }),
        new webpack.ProvidePlugin({
            jQuery: "jquery"
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new extractTextWebpackPlugin("style.css", {
            allChunks: true
        })
    ]
};

插件库定义

CommonsChunkPlugin 这个插件就是用于提取公共模块的插件，它从chunks中的若干个chunk代码块中分析出他们公用的模块，并打包成name定义的chunk代码块，你会发现common代码块和入口的common代码块重名，我们可以重新写一个新的名字。也可以不写。假如重名，生成的common.js中包好的模块是entry入口定义的所有模块。[‘vue’, ‘jquery’, ‘underscore’, ‘backbone’]，这样也比较好理解，因为我们。
htmlWebpackplugin 插件不是webpack自带的插件，它的作用是根据chunk代码块生成文档，下面的意思就是在index.html中引入index.js代码和common.js代码。
webpack.ProvidePlugin 插件用于有些库，比如bootstrap，打包不会出错，但是放在浏览器下就出问题，原因是bootstrap在初始化的时候要传入全局的jQuery变量，webpack中各模块都是独立的，jquery也是，jQuery无法赋值到window上，导致报错，这时候，这个插件就派上用场了，将jquery模块输出到全局的jQuery变量上。bootstrap不再报错
extractTextWebpackPlugin 这个外部插件可以将css文件独立剥离出来，保存为一个单独的样式文件。
插件可以更具开发环境定义，因为插件越多，编译越慢，我们在开发环境的时候其实不需要那么多插件，生产环境的时候才需要，所以可以做一些处理，动态添加插件。这里有文章可以做,不介绍。

4. 写逻辑代码

// index.js

var Vue = require('vue');

var app = new Vue({
    el: '#app',
    components: {
        app: require('./src/app.js')
    }
});

require('vue')，使用vue模块，新建vue实例，（vue的具体用法上官网），内建一个app字组件，用同步的方法获取在./src/目录下的app.js模块。

// index.html 入口模板

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>vueapp</title>
</head>
<body id="app">
    <app></app>
</body>
</html>

html-webpack-plugin会自动生成插入的script，制成入口。

// app.js

var template = require('./app.html');
require('./app.less');

module.exports = {
    template: template,
    data: function (){
        return {
            message: 'hello word!!'
        };
    }
};

// app.html 视图模板

<div id="div1">
    <img src="./static/logo.png" alt="">
    <div id="div2">
        {{message}}
    </div>
</div>

// app.less 视图样式

#div1 {
    text-align: center;
}

#div2 {
    font-size: 30px;
}

定义一个视图，作为首页，引入模板，引入样式，一个SPA的架子就这么搭好了。

5. 编译

在工程目录下命令行输入

webpack
生成目录

├── dist
│   ├── common.6b92c6b075a69a71d22f.js
│   ├── index.6b92c6b075a69a71d22f.js
│   ├── index.html
│   └── style.6b92c6b075a69a71d22f.css

编译完成，可以看到以上的目录，common为公共提取的模块，style是公共提取的css文件，index.js，逻辑入口。项目打包完成。

6. 调试开发

webpack 提供了 weppack-dev-server 插件，很方便我们进行调试，我们在package.json的script中定义一个命令：

'dev': 'webpack-dev-server --hot --inline'
我们就可以在命令行中输入 npm run dev，在浏览器输入localhost：8080就可以看到网页了。
