let base = require('./base.conf');
exports.config = {
    ...base.config,
    services: ['selenium-standalone','appium'],
    host: process.env.APPIUM_HOST || 'localhost',
    port: process.env.APPIUM_PORT || 4723,
    capabilities: [
        {
          platformName: 'Android',
          automationName: 'UiAutomator2',
          deviceName: 'emulator-5554',
          platformVersion: '9',
          browserName: 'chrome'
        },
    ],
};