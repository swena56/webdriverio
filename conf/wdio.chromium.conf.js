require("@babel/register");
const base = require('./base.conf');
const getChromeCap = require('./base-chrome.cap').getChromeCap;
let devices = [];

/*
 *   CAPS="iPhone 4 landscape,Nexus 5,iPhone 8 Plus,Galaxy S5"
*/
if( process.env.CAPS && process.env.CAPS.length ){
    let caps = process.env.CAPS.split(',');
    for (var i = caps.length - 1; i >= 0; i--) {
        devices.push(getChromeCap({ 
            headless: ! process.env.SHOW_UI || true, 
            mobileEmulation: caps[i],
        }));
    }
} else {
    devices.push(getChromeCap({ binary: `${require('puppeteer').executablePath()}` }));
}

exports.config = {
	...base.config,
    services: ['selenium-standalone'],
    capabilities: devices,
    onComplete: function(exitCode, config, capabilities, results) {
        require('shelljs').exec('pkill Chromium', {silent:true}).stdout;
        base.config.onComplete(exitCode, config, capabilities, results);
    },
};
