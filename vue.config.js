'use strict'
const path = require('path')
const glob = require('glob')

function resolve(dir) {
  return path.join(__dirname, dir)
}

function getEntry(globPath) {
  let entries = {}
  glob.sync(globPath).forEach((entry) => {
    let tmp = entry.split('/').splice(-3)
    entries[tmp[1]] = {
      entry: 'src/' + tmp[0] + '/' + tmp[1] + '/' + 'index.js',
      template: 'public/index.html',
      filename: tmp[1] + '.html'
    }
  })
  return entries
}

const pages = getEntry('./src/views/**?/*.vue')

module.exports = {
  lintOnSave: true,
  productionSourceMap: false, // 关闭SourceMap
  pages,
  parallel: require('os').cpus().length > 1, // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  devServer: {
    disableHostCheck: true,
    index: '/',
    open: process.platform === 'darwin',
    host: '',
    port: 9999,
    https: false,
    hotOnly: false,
    before: app => {
      app.get('/', (req, res) => {
        for (let i in pages) {
          res.write(`<a target="_self" href="/${i}"><h1>/${i}</h1></a>`)
        }
        res.end()
      })
    }
  },
  css: {
    loaderOptions: {
      css: {
        // css-loader配置
      },
      postcss: {
        // postcss-loader配置
        plugins: [
          require('postcss-pxtorem')({
            rootValue : 37.5, // 换算的基数，UI图片750px就是75，640px就是64，默认为75
            selectorBlackList  : ['weui'], // 忽略转换正则匹配项
            propList   : ['*'],
          })
        ]
      }
    }
  },
  // 允许对内部的 webpack 配置进行更细粒度的修改
  chainWebpack: config => {
    // 配置别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('views', resolve('src/views'))
    // 去除生产环境console
    config.optimization.minimizer('terser').tap((args) => {
      args[0].terserOptions.compress.drop_console = true
      return args
    })
    // 设置图片加载
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => {
        options.limit = 100
        return options
      })
    // 移除多页面preload,prefetch插件
    Object.keys(pages).forEach(entryName => {
      config.plugins.delete(`prefetch-${entryName}`)
      config.plugins.delete(`preload-${entryName}`)
    })
  }
}