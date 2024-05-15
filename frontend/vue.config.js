const path = require('path');

module.exports = {
  devServer: {
    proxy: 'http://localhost:3000/'
  },
  publicPath: process.env.PI_BUILD === 'true' ? 'http://pi.home/' : 'http://localhost:8080/',
  outputDir: process.env.PI_BUILD === 'true' ? path.resolve(__dirname, '../html') : undefined
}
