const path = require("path");
const webpack = require("webpack");
const BabiliWebpackPlugin = require("babili-webpack-plugin");
const resolve = dir => path.join(__dirname, dir);


module.exports = {
  // 基本路径
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  // 输出文件目录
  outputDir: "dist",
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  // 是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: false,
  // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建，在适当的时候开启几个子进程去并发的执行压缩
  parallel: require("os").cpus().length > 1,
  // 生产环境是否生成 sourceMap 文件, 一般情况不打开
  productionSourceMap: false,

  // 以多页模式构建应用程序。
  pages: {
    index: {
      // 应用入口配置，相当于单页面应用的main.js，必需项
      entry: 'src/index.js',
      // 应用的模版，相当于单页面应用的public/index.html，可选项，省略时默认与模块名一致
      template: 'dist/index.html',
      // 编译后在dist目录的输出文件名，可选项，省略时默认与模块名一致
      filename: 'index.html'
    },
    // main: {
    //   // 应用入口配置，相当于单页面应用的main.js，必需项
    //   entry: 'src/main.ts',
    //   // 应用的模版，相当于单页面应用的public/index.html，可选项，省略时默认与模块名一致
    //   template: 'public/index.html',
    //   // 编译后在dist目录的输出文件名，可选项，省略时默认与模块名一致
    //   filename: 'index.html'
    // }
  },

  // 对内部的 webpack 配置进行更细粒度的修改
  // https://github.com/neutrinojs/webpack-chain
  chainWebpack: config => {
    config
      .entry('index')
      .add('./src/index.js')
      .end()
      .when(process.env.NODE_ENV === 'build',
        // config => config.plugin('minify').use(BabiliWebpackPlugin),
        config => config.devtool('source-map'),
        // config => config.productionGzip(true)
      )
      .output
      .filename('topsports.js')
      .library('topsports')
      .libraryTarget('umd')
      .umdNamedDefine(true)


    config.externals({
      'Vuex': 'vuex',
      'VueRouter': 'vue-router',
      'iView': 'iview',
      'Vue': {
        root: 'Vue',
        commonjs: 'vue',
        commonjs2: 'vue',
        amd: 'vue'
      }
    })

    config.resolve.alias
      .set('@', resolve('src'))
      .set('@c', resolve('src/components'))
      .set('@s', resolve('styles'))
    return {
      ...config,
      extensions: ['.js', '.vue', '.ts']
    }
  },
  css: {
    // extract CSS in components into a single CSS file (only in production)
    extract: {
      filename: 'styles/topsports.css'
    },
    loaderOptions: {
      // 给 less-loader 传递选项
      less: {
        javascriptEnabled: true
      }
    }
  },
  // webpack-dev-server
  // 相关配置 https://webpack.js.org/configuration/dev-server/
  devServer: {
    host: "0.0.0.0",
    // 端口号
    port: 8080,
    // https:{type:Boolean}
    https: false,
    // 配置自动启动浏览器
    open: true,
    // 热更新
    hotOnly: true,
    // 配置跨域处理,只有一个代理 {}
    proxy: false,
    disableHostCheck: true
  },
  // 第三方插件配置
  pluginOptions: {}
};