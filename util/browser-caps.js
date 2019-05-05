
const CAP_LIST = {
	//------------------------ LV ------------------------

	//Windows
	Windows10_Chrome_v68: {
		browserName: 'chrome',
		platform: 'Windows 10',
		version: '68.0',
		build: 'Windows10_Chrome_v68',
		locationContextEnabled: true,
		//extendedDebugging: true,
		handlesAlerts: true,
		pageLoadStrategy: 'normal',
		autoAcceptAlerts: true,
		acceptSslCerts: true,
		acceptInsecureCerts: true,
		unexpectedAlertBehaviour: 'accept',
		tags:['@lv'],
		exclude:[],
		default_content_setting_values: { geolocation: 1 }
	},
	Windows10_Chrome_v67: {
		browserName: 'chrome',
		platform: 'Windows 10',
		version: '67.0',
		build: 'Windows10_Chrome_v67',
		locationContextEnabled: true,
		handlesAlerts: true,
		pageLoadStrategy: 'normal',
		autoAcceptAlerts: true,
		acceptSslCerts: true,
		acceptInsecureCerts: true,
		unexpectedAlertBehaviour: 'accept',
		tags:['@lv'],
		exclude:[],
		default_content_setting_values: { geolocation: 1 }
	},
	Windows7_Chrome_v67: {
		browserName: 'chrome',
		build: 'Windows7_Chrome_v67',
		platform: 'Windows 7',
		version: '67.0',
		locationContextEnabled: true,
		handlesAlerts: true,
		pageLoadStrategy: 'normal',
		autoAcceptAlerts: true,
		acceptSslCerts: true,
		acceptInsecureCerts: true,
		unexpectedAlertBehaviour: 'accept',
		extendedDebugging: true,
		tags:['@lv'],
	},
	Windows10_IE_v11: {
		browserName: 'internet explorer',
		build: 'Windows10_IE_v11',
		platform: 'Windows 10',
		version: '11.0',
		seleniumVersion: '3.141.0',
		iedriverVersion: '3.141.0',
		locationContextEnabled: true,
		handlesAlerts: true,
		pageLoadStrategy: 'normal',
		autoAcceptAlerts: true,
		acceptSslCerts: true,
		unexpectedAlertBehaviour: 'accept',
		//extendedDebugging: true,
		tags:['@lv'],
		exclude: [],
	},
	Windows10_Firefox_v62: {
		browserName: 'FireFox',
		build: 'Windows10_Firefox_v62',
		platform: 'Windows 10',
		version: '62.0',
		locationContextEnabled: true,
		handlesAlerts: true,
		pageLoadStrategy: 'normal',
		autoAcceptAlerts: true,
		acceptSslCerts: true,
		acceptInsecureCerts: true,
		unexpectedAlertBehaviour: 'accept',
		extendedDebugging: true,
		tags:['@lv'],
		exclude: [],
	},
	Windows7_Firefox_latest: {
		browserName: 'firefox',
		platform: 'Windows 7',
		version: 'latest',
		build: 'Windows7_Firefox_latest',
		locationContextEnabled: true,
		tags:['@lv'],
		exclude: [],
	},
	Windows7_Firefox_v62: {
		browserName: 'firefox',
		platform: 'Windows 7',
		version: '62.0',
		build: 'Windows7_Firefox_v62',
		locationContextEnabled: true,
		tags:['@lv'],
		exclude: [],
	},
	Windows7_Firefox_v61: {
		browserName: 'firefox',
		platform: 'Windows 7',
		version: '61.0',
		build: 'Windows7_Firefox_v61',
		locationContextEnabled: true,
		tags:['@lv'],
		exclude: [],
	},
	Windows10_MicrosoftEdge_v17: {
		browserName: 'MicrosoftEdge',
		build: 'Windows10_MicrosoftEdge_v17',
		platform: 'Windows 10',
		version: '17.17134',
		locationContextEnabled: true,
		handlesAlerts: true,
		pageLoadStrategy: 'normal',
		autoAcceptAlerts: true,
		acceptSslCerts: true,
		acceptInsecureCerts: true,
		unexpectedAlertBehaviour: 'accept',
		extendedDebugging: true,
		avoidProxy: true,
		tags: ['@lv'],
		exclude: [],
	},

	//MacOS
	MAC10_14_Safari_v12: {
		browserName: "safari",
		build: 'MAC10_14_Safari_v12',
		platform: 'macOS 10.14',
		version: '12.0',
		locationContextEnabled: true,
		handlesAlerts: true,
		pageLoadStrategy: 'normal',
		autoAcceptAlerts: true,
		acceptSslCerts: true,
		// acceptInsecureCerts: true,
		unexpectedAlertBehaviour: 'accept',
		extendedDebugging: true,
		tags:['@lv'],
		exclude: [],
	},
	MAC10_13_Safari_v11: {
		browserName: "safari",
		build: 'MAC10_13_Safari_v11',
		platform: 'macOS 10.13',
		version: '11.1',
		locationContextEnabled: true,
		handlesAlerts: true,
		pageLoadStrategy: 'normal',
		autoAcceptAlerts: true,
		acceptSslCerts: true,
		unexpectedAlertBehaviour: 'accept',
		tags:['@lv'],
		exclude: [],
	},

	MAC10_13_Chrome_latest: {
		browserName: 'chrome',
		platform: 'macOS 10.13',
		version: 'latest',
		build: 'MAC10.13_Chrome_latest',
		extendedDebugging: true,
		locationContextEnabled: true,
		handlesAlerts: true,
		pageLoadStrategy: 'normal',
		autoAcceptAlerts: true,
		acceptSslCerts: true,
		//acceptInsecureCerts: true,
		unexpectedAlertBehaviour: 'accept',
		tags:['@lv'],
		exclude: [],
	},
	MAC10_13_Chrome_v68: {
		browserName: 'chrome',
		platform: 'macOS 10.13',
		version: '68.0',
		build: 'MAC10.13_Chrome_v68',
		//extendedDebugging: true,
		locationContextEnabled: true,
		handlesAlerts: true,
		pageLoadStrategy: 'normal',
		autoAcceptAlerts: true,
		acceptSslCerts: true,
		//acceptInsecureCerts: true,
		unexpectedAlertBehaviour: 'accept',
		tags:['@lv'],
		exclude: [],
	},
	//TODO macOS - firefox, chrome
	iPad_Air_Simulator_Safari_v11: {
		browserName: 'Safari',
		appiumVersion: '1.7.2',
		deviceName: 'iPad Air Simulator',
		build: 'iPad_Air_Simulator_Safari_v11',
		autoAcceptAlerts: 'true',
		locationContextEnabled: true,
		handlesAlerts: true,
		locationServicesEnabled: true,
		locationServicesAuthorized: true,
		unexpectedAlertBehaviour: 'accept',
		deviceOrientation: 'portrait',
		platformVersion: '11.2',
		platformName: 'iOS',
		extendedDebugging: true,
		tags:['@lv'],
		exclude: [],
	},

	//------------------------ MV ------------------------
	//------------------------ SV ------------------------

	//iOS
	iPhone_7_Safari_v11: {
		browserName: 'Safari',
		appiumVersion: '1.8.1',
		deviceName: 'iPhone 7 Simulator',
		build: 'iPhone_7_Safari',
		autoAcceptAlerts: 'true',
		locationContextEnabled: true,
		deviceOrientation: 'portrait',
		platformVersion: '11.3',
		platformName: 'iOS',
		tags:['@sv'],
		exclude: [],
	},
	iPhone_8_Safari_v11: {
		browserName: 'Safari',
		appiumVersion: '1.7.2',
		deviceName: 'iPhone 8 Simulator',
		build: 'iPhone8_Simulator_Safari_v11',
		autoAcceptAlerts: 'true',
		locationContextEnabled: true,
		handlesAlerts: true,
		locationServicesEnabled: true,
		locationServicesAuthorized: true,
		unexpectedAlertBehaviour: 'accept',
		deviceOrientation: 'portrait',
		platformVersion: '11.2',
		platformName: 'iOS',
		tags:['@sv'],
		exclude: [],
	},

	//Android
	Android_GoogleAPI_Chrome: {
		browserName: 'Chrome',
		appiumVersion: '1.8.1',
		deviceName: 'Android GoogleAPI Emulator',
		build: 'Android_GoogleAPI_Chrome',
		automationName: 'uiautomator2',
		autoAcceptAlerts: 'true',
		locationContextEnabled: true,
		autoGrantPermissions: true,
		handlesAlerts: true,
		locationServicesAuthorized: true,
		locationServicesEnabled: true,
		unexpectedAlertBehaviour: 'accept',
		deviceOrientation: 'portrait',
		platformVersion: '7.0',
		platformName: 'Android',
		tags:['@sv'],
		exclude: [
		]
	},
	Samsung_Galaxy_S7_Chrome: {
		browserName: 'Chrome',
		appiumVersion: '1.8.1',
		deviceName: 'Samsung Galaxy S7 Edge GoogleAPI Emulator',
		build: 'Samsung_Galaxy_S7_Edge_Chrome',
		automationName: 'uiautomator2',
		autoAcceptAlerts: 'true',
		locationContextEnabled: true,
		autoGrantPermissions: true,
		handlesAlerts: true,
		locationServicesAuthorized: true,
		locationServicesEnabled: true,
		unexpectedAlertBehaviour: 'accept',
		deviceOrientation: 'portrait',
		platformVersion: '7.1',
		platformName: 'Android',
		tags:['@sv'],
		exclude: [
		]
	},
	Samsung_Galaxy_S8_Plus_Emulator_Chrome: {
		browserName: 'Chrome',
		appiumVersion: '1.8.1',
		deviceName: 'Samsung Galaxy S8 Plus GoogleAPI Emulator',
		build: 'Samsung_Galaxy_S8_Plus_Emulator_Chrome',
		automationName: 'uiautomator2',
		autoAcceptAlerts: 'true',
		locationContextEnabled: true,
		autoGrantPermissions: true,
		handlesAlerts: true,
		locationServicesAuthorized: true,
		locationServicesEnabled: true,
		unexpectedAlertBehaviour: 'accept',
		deviceOrientation: 'portrait',
		platformVersion: '7.1',
		platformName: 'Android',
		tags:['@sv'],
		exclude: []
	},
	Samsung_Galaxy_S9_Plus_Emulator_Chrome: {
		browserName: 'Chrome',
		appiumVersion: '1.8.1',
		deviceName: 'Samsung Galaxy S9 Plus WQHD GoogleAPI Emulator',
		build: 'Samsung_Galaxy_S9_Plus_Emulator_Chrome',
		automationName: 'uiautomator2',
		autoAcceptAlerts: 'true',
		locationContextEnabled: true,
		autoGrantPermissions: true,
		handlesAlerts: true,
		locationServicesAuthorized: true,
		locationServicesEnabled: true,
		unexpectedAlertBehaviour: 'accept',
		deviceOrientation: 'portrait',
		platformVersion: '7.1',
		platformName: 'Android',
		tags: ['@sv'],
		exclude: []
	},
	Samsung_Galaxy_TabA_10_Emulator_Chrome: {
		browserName: 'Chrome',
		appiumVersion: '1.8.1',
		deviceName: 'Samsung Galaxy Tab A 10 GoogleAPI Emulator',
		build: 'Samsung_Galaxy_TabA_10_Emulator_Chrome',
		automationName: 'uiautomator2',
		autoAcceptAlerts: 'true',
		locationContextEnabled: true,
		autoGrantPermissions: true,
		handlesAlerts: true,
		locationServicesAuthorized: true,
		locationServicesEnabled: true,
		unexpectedAlertBehaviour: 'accept',
		deviceOrientation: 'portrait',
		platformVersion: '7.1',
		platformName: 'Android',
		tags: ['@lv'],
		exclude: []
	},
};

function applyExclusionRules(caps_list,exclusion_rules) {

	//TODO need arrays of keys for devices by size, inorder to have the lv sv exclusion feature
	// let largeDevices = Object.keys(caps_list.filter((o)=> o.tags && o.tags[0] == 'lv' ));
	// let smallDevices = Object.keys(caps_list.filter((o)=> o.tags && o.tags[0] == 'sv' ));
	// console.log(largeDevices,smallDevices);

	for (let i = 0; i < exclusion_rules.length; i++) {

		if( exclusion_rules[i].from ){

			let device_keys = Object.keys(caps_list);

			let from_array = exclusion_rules[i].from.trim().toLowerCase().split(',');
			//console.log(from_array);
			for (let j = 0; j < from_array.length; j++) {

				if( from_array[j] == 'all' ){
					for( let cap in caps_list ) {
						if( caps_list[cap].exclude ){
							caps_list[cap].exclude.push(exclusion_rules[i].test);
						}
					}
					continue;
				}

				if( from_array[j] && from_array[j].includes('(') && from_array[j].includes(')') ){
					let str_no_brackets = from_array[j].replace(/[\(\)']/g,'' ).trim().toLowerCase();
					device_keys = device_keys.filter((o) => o.toLowerCase().indexOf(str_no_brackets) == -1);

					if( from_array[j] == 'lv' ){
						//device_keys = device_keys.filter(x => largeDevices.includes(x));
					}

					if( from_array[j] == 'sv' ){
						//device_keys = device_keys.filter(x => smallDevices.includes(x));
					}

					for (let j = 0; j < device_keys.length ; j++) {
						if( ! caps_list[device_keys[j]].exclude ){
							caps_list[device_keys[j]].exclude = [];
						}

						if( !caps_list[device_keys[j]].exclude.includes(exclusion_rules[i].test) ){
							caps_list[device_keys[j]].exclude.push(exclusion_rules[i].test);
						}
					}
				} else {
					if( from_array[j] ){

						let device_keys_tmp = device_keys.filter((o) => o.toLowerCase().indexOf(from_array[j].trim().toLowerCase()) > -1);

						for (let j = 0; j < device_keys_tmp.length ; j++) {
							if( ! caps_list[device_keys_tmp[j]].exclude ){
								caps_list[device_keys_tmp[j]].exclude = [];
							}

							if( !caps_list[device_keys_tmp[j]].exclude.includes(exclusion_rules[i].test) ){
								caps_list[device_keys_tmp[j]].exclude.push(exclusion_rules[i].test);
							}
						}
					}
				}
			}
		}
	}

	//console.log(caps_list);

	return caps_list;
}

/**
 * Create an array of desired capabilities for wdio's config.
 *
 * Capabilities are passed as a string containing a comma-separated list of browser names.
 *
 * TODO - fetch caps directly from sauce labs
 * TODO - involve cap selection based on analytics
 *
 * Note about Caps:
 * 		All of the caps include a tag, example: tags:['@sv']
 * 		All caps include a build
 *
 * Questions:
 * 		Cap version: is this the OS version or the browser version, seems very important.
 *  https://code.bestbuy.com/wiki/display/PUB/Test+Defects+Tracker
 * 	Usage:
 * 		//wdio.config.js
 * 		require('babel-register');
 * 		const devices = require('./util/browser-caps').getCaps(process.env.CAPS || 'all');
 * 		capabilities: devices,
 *
 * @param {String} capabilities
 */
function getCaps(capabilities){
	if (typeof capabilities !== 'string' || capabilities.length === 0) {
		return [ CAP_LIST.MAC10_13_Chrome_latest ];
	}

	const browsers = capabilities.replace(/\s+/, "").toLowerCase().split(',');

	if( browsers.includes('list') ){
		let caps_keys = Object.keys(CAP_LIST);
		console.log(caps_keys);
		process.exit(1);
		return caps_keys;
	}

	let excludedTests = [];
	try{
		if( process.env.EXCLUDED_TESTS ){
			excludedTests = JSON.parse(process.env.EXCLUDED_TESTS);
		}
	} catch (e) {
		console.log('Failed to parse EXCLUDED_TESTS');
	}

	//process inclusion of test specs
	let caps;
	if( excludedTests ){
		caps = applyExclusionRules(CAP_LIST,excludedTests);
	} else {
		caps = CAP_LIST;
	}

	let used_caps = [];
	for( let cap in caps ){
		if(browsers.includes('all') ){
			used_caps.push(caps[cap]);
		} else {
			for (let i = 0; i < browsers.length; i++) {
				if( cap.toLowerCase().indexOf(browsers[i]) > -1 ){
					used_caps.push(caps[cap]);
					break;
				}
			}
		}
	}

	if( ! used_caps || used_caps.length == 0 ){
		console.log("Found 0 matching browser capabilities");
		process.exit(1);
	} else {
		//TODO print general stats about what is being tested
		 //console.log(`Number of Caps: ${caps.length}`);
		//console.log( caps );
	}

	if( used_caps.length == 1 && process.env.LIMIT ){

		if( parseInt(process.env.LIMIT) && process.env.LIMIT > 0 && process.env.LIMIT <= 100 ){
			let tmp = used_caps[0];
			for (let i = 0; i < parseInt(process.env.LIMIT); i++) {
				used_caps.push(tmp);
			}
		}
	}

	return used_caps;
}

export { getCaps, CAP_LIST };
