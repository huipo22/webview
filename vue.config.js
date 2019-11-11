module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: 'https://gh.jishanhengrui.com/api',
          ws: true,
          changeOrigin: true
        },
        '/foo': {
          target: '<other_url>'
        }
      }
    }
  }