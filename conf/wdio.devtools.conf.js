const getChromeCap = require('./base.chrome.conf').getChromeCap;
const base = require('./base.conf');
let devices = [];

if( process.env.SIZE === 'lv' ){
	devices.push(
		getChromeCap({
			devtoolsPort: 9222,
			binary: `${require('puppeteer').executablePath()}`,
			userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.67 Safari/537.36',
		})
	);
} else {
	devices.push(
		getChromeCap({
			devtoolsPort: 9222,
			binary: `${require('puppeteer').executablePath()}`,
			userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X; en-us) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53',
		})
	);
}

exports.config = {
	...base.config,
	services:['devtools','selenium-standalone'],
	capabilities: devices,
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
	        	//browser.options.config.count++;
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
		base.config.afterTest(test);
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