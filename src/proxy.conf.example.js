const PROXY_CONF = {
  '/api': {
    target: '',
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
  },
};

module.exports = PROXY_CONF;
