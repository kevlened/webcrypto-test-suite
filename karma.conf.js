module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      'jasmine/index.js'
    ],
    reporters: ['progress'],
    port: 9876,
    colors: true,
    // config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless', 'FirefoxHeadless'],
    customLaunchers: {
      FirefoxHeadless: {
        base: 'Firefox',
        flags: ['-headless']
      }
    }
  })
}
