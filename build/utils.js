var path = require('path')
var config = require('../config')
// glob模块，用于读取webpack入口目录文件
var glob = require('glob')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    var loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: 'px2rem-loader',
        options: Object.assign({}, loaderOptions, {
          remUnit: 112.5
        })
      })
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // http://vuejs.github.io/vue-loader/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', {indentedSyntax: true}),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}

//获取js入口文件
exports.getEntries = function (globPath, type) {
  var entries = {}
  var ishtml = type !== undefined ? true : false
  /**
   * 读取src目录,并进行路径裁剪
   */
  glob.sync(globPath).forEach(function (entry) {
    /**
     * path.basename 提取出用 ‘/' 隔开的path的最后一部分，除第一个参数外其余是需要过滤的字符串
     * path.extname 获取文件后缀
     */
    // var basename = path.basename(entry, path.extname(entry), 'router.js') // 过滤router.js
    // ***************begin***************
    // 当然， 你也可以加上模块名称, 即输出如下： { module/main: './src/module/index/main.js', module/test: './src/module/test/test.js' }
    // 最终编译输出的文件也在module目录下， 访问路径需要时 localhost:8080/module/index.html
    // slice 从已有的数组中返回选定的元素, -3 倒序选择，即选择最后三个
    //以ocahost:8080/homeIndex.html这样形式访问
    if (ishtml) {
      //html以模块文件作为输出
      //以locahost:8080/views/index.html这样形式访问
      /*var tmp = entry.split('/').splice(-3)
       var moduleName = tmp.slice(0, 2).join("/");
       console.log(moduleName);
       entries[moduleName] = entry*/
      var tmp = entry.split('/').splice(-3)
      var pre = 'infore/'
      var moduleName = pre + tmp.splice(1, 2).join('/')
      entries[moduleName] = entry

    }
    else {
      //js以模块文件作为输出,比如indx.js
      var basename = path.basename(entry, path.extname(entry))
      tmp = entry.split('/').splice(-3)
      pathname = tmp.splice(1, 1)
      entries[pathname] = entry
    }
    //以locahost:8080/views/index.html这样形式访问
    // var tmp = entry.split('/').splice(-3)
    // var moduleName = tmp.slice(1, 2);
    // console.log(moduleName);
    // entries[moduleName] = entry
  })
  // console.log(entries);
  // 获取的主入口如下： { main: './src/module/index/main.js', test: './src/module/test/test.js' }
  return entries
}
