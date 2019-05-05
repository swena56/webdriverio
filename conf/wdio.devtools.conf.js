
let userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.67 Safari/537.36';
let size = process.env.SIZE || 'lv';
size = size.toLowerCase();

if( size == 'sv' ){
	userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X; en-us) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53';
}

const getChromeCap = require('./base.chrome.conf').getChromeCap;
let devices = [];
devices.push(
	getChromeCap({
		devtoolsPort: 9222,
		binary: `${require('puppeteer').executablePath()}`,
		userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.67 Safari/537.36'
	})
);

//ssh://git@git.bestbuy.com/shop/shopviewteam-jenkins-slave.git
let count = 0;

exports.config = {
	baseUrl: process.env.BASE_URL,.
	specs: ['./test/**/*.spec.js'],
	exclude: [],
	services:['devtools','selenium-standalone','chromedriver'],
	chromeDriverArgs: ['--port=9999'],
	chromeDriverLogs: './',
	reporters: ['spec','allure','dot', 'junit'],
	reporterOptions: {
		allure: {outputDir: 'allure-results'}, 
		junit: {outputDir: 'junit-results'}
	},
	maxInstances: 1,
	capabilities: [base],
	sync: true,
	logLevel: 'error', //silent | verbose | command | data | result | error
	coloredLogs: true,
	deprecationWarnings: true,
	bail: 1,
	screenshotPath: './errorShots/',
	waitforTimeout: 40000,
	connectionRetryTimeout: 90000,
	connectionRetryCount: 0,
	framework: 'mocha',
	mochaOpts: {
		ui: 'bdd',
		compilers: ['js:babel-register'],
		timeout: 99999999
	},
	beforeSession: function (config, capabilities, specs) {
		var tagFlag = `${capabilities.tags}`;

		if((tagFlag == config.mochaOpts.grep)|(config.mochaOpts.grep == "@both")){
			config.mochaOpts.grep = `${capabilities.tags}`
		} else {
			process.exit(0)
		}
	},
	before: function (capabilities, specs) {
		var chai = require('chai');
		var chaiWebdriver = require('chai-webdriverio').default;
		chai.use(chaiWebdriver(browser));
		global.expect = chai.expect;
		global.should = chai.should();
		require('babel-register');
		//browser.cdp('Performance', 'enable');
		//Network.emulateNetworkConditions
	},

	beforeCommand(){
	},

	afterCommand(commandName, args, result, error){
	},

	beforeTest: function (test) {
		
		browser.cdp('Profiler', 'enable');
		browser.cdp('Debugger', 'enable');

		browser.cdp('Profiler', 'startPreciseCoverage', {
			callCount: true,
			detailed: true
		});
		//browser.cdp('Network','setBlockedURLs', ['*bestbuy.com*']);
		browser.cdp('Network', 'enable');
		browser.cdp('Network', 'emulateNetworkConditions', {
            offline: false,
            latency: 100,
            downloadThroughput: 750e2,
            uploadThroughput: 250e2
        });

	    browser.on('Network.responseReceived', (params) => {
	        if( params.response.status >= 500 ){
	        	console.log(`Loaded ${params.response.status}`);
	        	count++;
	        }
	    });

		//Emulation.setGeolocationOverride

	    //browser.cdp('Network','setBlockedURLs',[]);

	    // browser.on('Performance.metrics', (params) => {
	    //     	console.log(params);//TaskDuration
	    // });

		// browser.cdp('Page.captureScreenshot');

	    //https://chromedevtools.github.io/devtools-protocol/tot/Network

	},
	afterTest: function(test){
		const { result } = browser.cdp('Profiler', 'takePreciseCoverage');
		const coverage = result.filter((res) => res.url !== '');
		
		coverage.forEach( function(element, index) {
			//console.log(element.url);
		});

		console.log(`Server errors ${count}`);
		expect(count == 0,"Server errors detected 50X").to.equal(true);
		count = 0;
	},
}