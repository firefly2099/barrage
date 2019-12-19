module.exports = {
  publicPath: "./",

  // : "https://pinganeleme.togoalad.com/191118/",

  devServer: {
    // hot: true,
    // clientLogLevel: "warning",
    /*proxy: {
      "/191212": {
        target: "https://pinganeleme.togoalad.com",
        changeOrigin: true,
        pathRewrite: {}
      }
    }*/
  },

  pages: {
    index: {
      // page 的入口
      entry: "src/main.js",
      // 模板来源
      template: "public/index.html",
      // 在 dist/index.html 的输出
      filename: "index.html"
    }
  },

  // 生产环境 sourceMap
  // 静态文件目录
  // assetsDir: 'static',
  productionSourceMap: false
};
