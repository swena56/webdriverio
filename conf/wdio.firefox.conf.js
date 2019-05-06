let base = require('./base.conf');
const smallUserAgent = process.env.USER_AGENT ||
	"Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X; en-us) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53";

const args = [];

if( ! process.env.SHOW_UI ){
	args.push('--headless');
}

let path_items = process.env.PATH.split(':').filter( o => o.toLowerCase().includes('firefox') );

if( process.env.FIREFOX_BIN ){
	path_items.push(process.env.FIREFOX_BIN);
}

if( ! path_items.length && require('fs').existsSync('node_modules/puppeteer-firefox') ){
	path_items.push(`${require('puppeteer-firefox').executablePath()}`);
}

let devices = [];
path_items.forEach( bin =>{

	let firefoxBase = {
		browserName: 'firefox',
		marionette: true,
		'moz:firefoxOptions':{
			binary: bin,
			args: args,
		}
	};

	devices.push({
		...firefoxBase,
		tags: ['@lv'],
		build: `firefox-headless-lv`,
		'moz:firefoxOptions': {
			...firefoxBase['moz:firefoxOptions'],
			prefs: {
				'dom.disable_window_open_feature.location': true,
				//"dom.ipc.processCount": 8,  // breaks when used in container
				'browser.tabs.remote.autostart': false,
				'browser.tabs.remote.autostart.2': false,
				'geo.prompt.testing': true,
				'geo.prompt.testing.allow': true,
				'geo.enabled': true,
				'permissions.default.geo': true,
				'browser.window.width' : '1920',
				'browser.window.height' : '1080',
			},
		},
	});

	devices.push({
		...firefoxBase,
		tags: ['@sv'],
		build: `firefox-headless-sv`,
		'moz:firefoxOptions': {
			...firefoxBase['moz:firefoxOptions'],
			prefs: {
				'general.useragent.override': `${smallUserAgent}`,
				'dom.disable_window_open_feature.location': true,
				'browser.tabs.remote.autostart': false,
				'browser.tabs.remote.autostart.2': false,
				//"dom.ipc.processCount": 8,  // breaks when used in container
				'geo.prompt.testing': true,
				'geo.prompt.testing.allow': true,
				'geo.enabled': true,
				'permissions.default.geo': true,
				'browser.window.width' : '1920',
				'browser.window.height' : '1080',
			},
		},
	});
});

if( ! devices.length ){
	console.log("[!] Try defining a firefox browser to your env path, setting the FIREFOX_BIN env var, or installing the npm package puppeteer-firefox" );
	console.log("\tExamples:  export PATH=$PATH:/usr/bin/firefox" );
	console.log("\t\texport FIREFOX_BIN=/usr/bin/firefox" );
	console.log("\t\tnpm install puppeteer-firefox" );
	process.exit();
}

exports.config = {
	...base.config,
	services:['selenium-standalone'],
	capabilities: devices,
};
