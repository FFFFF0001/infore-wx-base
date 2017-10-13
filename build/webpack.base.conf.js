var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var webpack = require('webpack')
var entries = utils.getEntries('./project/module/**/' + config.module.name + '.js')// 获得入口js文件
var HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const webpackConfig = {
  entry: entries,
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('core'),
      '~': resolve('project'),
    },
    symlinks: false
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    // 3. 配置全局使用 jquery
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      jquery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ]
}

var pages = utils.getEntries('./project/module/**/' + config.module.name + '.html', 1)

for (let pathname in pages) {
  // 生成html相关配置
  let conf = {
    filename: pathname, // html文件输出路径
    template: pages[pathname],   // 模板路径
    inject: true,                // js插入位置
    minify: {
      //压缩设置
      //removeComments: true,
      //collapseWhitespace: true,
      //removeAttributeQuotes: true
      // more options:
      // https://github.com/kangax/html-minifier#options-quick-reference
    },
    // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    // chunksSortMode: 'dependency'
  }
  pathname = pathname.split('/')[1]//去掉views
  if (pathname in webpackConfig.entry) {
    conf.inject = 'body'
    //如果每个html没有进入这里的话，那么全部js将会插入html
    conf.chunks = ['env', pathname, 'vendor', 'manifest'],
      conf.hash = true
    var temp = pathname
    conf.chunksSortMode = function (chunk1, chunk2) {
      var order = ['manifest', 'vendor', 'env', temp]
      console.log(order)
      var order1 = order.indexOf(chunk1.names[0])
      var order2 = order.indexOf(chunk2.names[0])
      console.log(chunk1.names[0] + '--' + order1 + '---chunk2==' + chunk2.names[0] + '---order2==' + order2)
      return order1 - order2
    }
    conf.moduleName = pathname
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf))
}

const vuxLoader = require('vux-loader')

const vuxConfig = {
  plugins: ['vux-ui', 'duplicate-style']
}
// console.log(webpackConfig)
module.exports = vuxLoader.merge(webpackConfig, vuxConfig)
