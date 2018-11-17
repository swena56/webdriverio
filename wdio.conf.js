//node -r babel-register node_modules/webdriverio/bin/wdio wdio.standalone.config.js --mochaOpts.grep=@lv --spec
var path = require('path');
var VisualRegressionCompare = require('wdio-visual-regression-service/compare');

function getScreenshotName(basePath) {
	return function(context) {
		var type = context.type;
		var testName = context.test.title;
		var browserVersion = parseInt(context.browser.version, 10);
		var browserName = context.browser.name;
		var browserViewport = context.meta.viewport;
		var browserWidth = browserViewport.width;
		var browserHeight = browserViewport.height;

		return path.join(basePath, `${testName}_${type}_${browserName}_v${browserVersion}_${browserWidth}x${browserHeight}.png`);
	};
}
require('babel-register');
const devices = require('./util/browser-caps').getCaps(process.env.CAPS);
let config = {
	baseUrl: process.env.BASE_URL || 'https://www.google.com',
	services: [
		'visual-regression',
		//'selenium-standalone',
		//'sauce',
	],
	specs: [
		'./test/**/*.spec.js'
	],
	exclude: [],
	reporters: ['spec','allure','dot', 'junit'],
	reporterOptions: {
		allure: {
			outputDir: 'allure-results'
		},
		junit: {
			outputDir: 'junit-results'
		}
	},
	visualRegression: {
		compare: new VisualRegressionCompare.LocalCompare({
			referenceName: getScreenshotName(path.join(process.cwd(), 'screenshots/reference')),
			screenshotName: getScreenshotName(path.join(process.cwd(), 'screenshots/screen')),
			diffName: getScreenshotName(path.join(process.cwd(), 'screenshots/diff')),
			misMatchTolerance: 0.01,
		}),
		viewportChangePause: 300,
		viewports: [{ width: 320, height: 480 }, { width: 480, height: 320 }, { width: 1024, height: 768 }],
		orientations: ['landscape', 'portrait'],
	},
	maxInstances: 1,
	capabilities: devices,
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
	},
	before: function (capabilities, specs) {
		var chai = require('chai');
		var chaiWebdriver = require('chai-webdriverio').default;
		var chaiAsPromised = require('chai-as-promised');
		//chai.use(chaiAsPromised);
		chai.use(chaiWebdriver(browser));
		global.expect = chai.expect;
		global.should = chai.should;

		require('babel-register');
		// browser.windowHandlePosition({x: 2000, y: 200});
		// browser.windowHandleSize({width:1280,height:800});
		//https://developer.mozilla.org/
	},
	beforeCommand: function (commandName, args) {
	},
	beforeSuite: function (suite) {
	},
	beforeTest: function (test) {
	},
	beforeHook: function () {
	},
	afterHook: function () {
	},
	afterTest: function (test) {
	},
	afterSuite: function (suite) {
	},
	afterCommand: function (commandName, args, result, error) {
	},
	after: function (result, capabilities, specs) {
	},
	afterSession: function (config, capabilities, specs) {
	},
	onComplete: function(exitCode, config, capabilities) {
	}
};

if( process.env.SAUCE ){

	if( process.env.SAUCE_USERNAME && process.env.SAUCE_ACCESS_KEY ){
		config.user = process.env.SAUCE_USERNAME;
		config.key = process.env.SAUCE_ACCESS_KEY;
	}
}

exports.config = config;