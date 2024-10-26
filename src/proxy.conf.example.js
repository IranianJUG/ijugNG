const PROXY_CONF = {
  '/bank-api': {
    target: 'http://194.225.50.32:3333/',
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
  },
  '/api': {
    target: 'http://192.168.65.6:8080/nejat',
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
  },
};

module.exports = PROXY_CONF;
