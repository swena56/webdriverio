const base = require('./base.conf');

//example: const getChromeCap = require('./base.chrome.conf').getChromeCap;
//TODO '--incognito', '--no-sandbox', '--auto-open-devtools-for-tabs','--verbose',

const DEFAULT_ARGS = [
	//'--disable-background-networking',
	'--disable-background-timer-throttling',
	'--disable-backgrounding-occluded-windows',
	'--disable-breakpad',
	'--disable-client-side-phishing-detection',
	'--disable-default-apps',
	'--disable-dev-shm-usage',
	'--disable-extensions',
	'--disable-features=site-per-process',
	'--disable-hang-monitor',
	'--disable-ipc-flooding-protection',
	'--disable-popup-blocking',
	'--disable-prompt-on-repost',
	'--disable-renderer-backgrounding',
	'--disable-sync',
	'--disable-translate',
	'--metrics-recording-only',
	'--no-first-run',
	'--safebrowsing-disable-auto-update',
	'--enable-automation',
	'--password-store=basic',
	'--disable-single-click-autofill',

	//untested
	'--disable-popup-blocking',
	'--disable-geolocation',
	'--window-size=1920,1080',
	'--no-sandbox',
	'--disable-infobars',
	'--fast-start',
	'--disable-setuid-sandbox',
	'--crash-dumps-dir=/tmp',
];

exports.getChromeCap = function( 
		options={ mobileEmulation: false, userAgent:false , headless: false, binary:false, devtoolsPort: 0  },
		additionalArgs = [], 
	){

	let chromeOptions = {
		//prefs: {'profile.managed_default_content_settings.geolocation': 2},
	};

    let args = [ 
        '--disable-infobars',
		'--fast-start',
		'--verbose',
    ];

    if( options.devtoolsPort && parseInt(options.devtoolsPort) ){
    	args.push(`--remote-debugging-port=${devtoolsPort}`);
    }

    if( options.userAgent ){
    	args.push(`--useragent="${userAgent}"`);
    }

    if( options.headless ){
    	args.push('--headless');
    	args.push('--disable-gpu');
    }

    //only compatiable with puppeteer chromium
    if( options.mobileEmulation ){

    	if( ! require('fs').existsSync('node_modules/puppeteer') ){
    		throw new Error('Requires puppeteer to be linked/installed');
    	}

    	chromeOptions['binary'] = `${require('puppeteer').executablePath()}`;

    	const deviceSpecsArray = require('puppeteer').devices;
    	const specs = deviceSpecsArray[options.mobileEmulation];

    	if( options.mobileEmulation.includes('list') || ! specs ){
	        console.log(`${JSON.stringify(deviceSpecsArray.map( o => o.name ), null, '\t')}`);
	        console.log(`'${options.mobileEmulation}' <- Invalid Device, select one from this list`);
	        process.exit();
	    }

	    args.push(`--window-size=${specs.viewport.width},${specs.viewport.height}`);

	    chromeOptions['mobileEmulation'] = {
            userAgent: specs.userAgent,
            deviceMetrics: {
                width: specs.viewport.width,
                height: specs.viewport.height,
                pixelRatio: specs.viewport.deviceScaleFactor,
            },
        };
    }

    if( options.binary ){
    	chromeOptions['binary'] = options.binary;
    }

    chromeOptions['args'] = args;

    let cap = {
	    browserName: 'chrome',
	    "goog:chromeOptions": chromeOptions,
    };

    return cap;
};
