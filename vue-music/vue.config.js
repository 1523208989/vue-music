const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  //跨域api配置
  devServer: {
    proxy: {
      /* 
      'slideApi':{},就是告诉node接口以'/slideApi'开头才用代理，
      '请求地址：/slideApi/xxx/xx'=>'https://u.y.qq.com/cgi-bin/musics.fcg/slideApi/xxx/xx' 
      pathRewrite:{
        '^/slideApi': ''   //正则匹配除去请求地址中的'/slideApi'
                           //   请求地址 =>'https://u.y.qq.com/cgi-bin/musics.fcg/xxx/xx'
      }
      */
      '/slideApi': {
        target: 'https://c.y.qq.com/v8/fcg-bin/musicmall.fcg',
        changeOrigin: true,
        pathRewrite: {
          '^/slideApi': ''
        }
      },
      '/songListApi': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {}
      },
      '/songListDetailApi': {
        target: 'https://api.qq.jsososo.com/songlist',
        changeOrigin: true,
        pathRewrite: {
          '^/songListDetailApi': ""
        }
      },
      '/singerListApi': {
        target: 'https://u.y.qq.com/cgi-bin/musics.fcg',
        changeOrigin: true,
        pathRewrite: {
          '^/singerListApi': ''
        }
      },
      '/singerDetailApi': {
        target: 'https://api.qq.jsososo.com/singer/songs',
        changeorigin: true,
        pathRewrite: {
          '^/singerDetailApi': ''
        }
      },
      '/audioApi': {
        target: 'https://u.y.qq.com/cgi-bin/musics.fcg',
        changeOrigin: true,
        pathRewrite: {
          '^/audioApi': ''
        }
      },
      '/lyricApi': {
        target: 'https://api.zsfmyz.top/music/lyric',
        changeOrigin: true,
        pathRewrite: {
          '^/lyricApi': ''
        }
      },
      '/rankListApi': {
        target: 'https://api.qq.jsososo.com/top/category',
        changeOrigin: true,
        pathRewrite: {
          '^/rankListApi': ""
        }
      },
      '/rankingDetailApi':{
        target:'https://api.qq.jsososo.com/top',
        changeOrigin:true,
        pathRewrite:{
          '^/rankingDetailApi':''
        }
      }
    }
  },
  pluginOptions: { // 第三方插件配置
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/assets/style/app.less')] // less所在文件路径
    }
  },
  publicPath: "/",
  // 输出文件目录
  outputDir: "dist",
  // 静态资源存放的文件夹(相对于ouputDir)
  assetsDir: "static",
  // eslint-loader 是否在保存的时候检查(果断不用，这玩意儿我都没装)
  lintOnSave: false,
  // 我用的only，打包后小些
  runtimeCompiler: false,
  productionSourceMap: true, // 不需要生产环境的设置false可以减小dist文件大小，加速构建

  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('./src'))
      .set('components', resolve('./src/components'))
      .set('assets', resolve('./src/assets'))
      .set('common', resolve('./src/common'))
      .set('views', resolve('./src/views'))
      .set('api', resolve('./src/api'))
    //set第一个参数：设置的别名，第二个参数：设置的路径
  }
}

