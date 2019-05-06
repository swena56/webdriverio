require("@babel/register");
//const video = require('wdio-video-reporter');
const configUtil = require('./config-util');
const excludes = configUtil.getExcludes();
const specs = configUtil.getSpecs();

exports.config = {
	runner: 'local',
	baseUrl: process.env.BASE_URL || 'https://webdriver.io/docs/api.html',
	exclude: excludes,
    outputDir: './../',
	services:[],
	specs: specs,
	framework: 'mocha',
    reporters: [ 
        'dot',
        'spec',
        ['junit', {
            outputDir: 'junit-results',
        }],
        ['allure', {
            outputDir: 'allure-results',
            //disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: true,
        }],
        /*[ video, {
            outputDir:'/',
            saveAllVideos: false,       // If true, also saves videos for successful test cases
            videoSlowdownMultiplier: 3, // Higher to get slower videos, lower for faster videos [Value 1-100]
        }],*/
    ],
    debug: false,
    seleniumLogs: './../logs/',
	logLevel: process.env.LOG_LEVEL || 'error', //silent | verbose | command | data | result | error
    bail: 0, //parseInt(process.env.WAIT_FOR_TIMEOUT) && process.env.WAIT_FOR_TIMEOUT > 0 || 0,
    waitforTimeout: parseInt(process.env.WAIT_FOR_TIMEOUT) || 10000,
    connectionRetryTimeout: parseInt(process.env.CONN_RETRY_TIMEOUT) || 90000,
    connectionRetryCount: parseInt(process.env.CONN_RETRY_COUNT) || 3,
    specFileRetries: parseInt(process.env.SPEC_RETRY_COUNT) || 1,
    maxInstances: parseInt(process.env.MAX_INSTANCES) || 10 ,
    mochaOpts: {
        ui: 'bdd',
        timeout: false,
        compilers: ['js:@babel/register'],
    },
    filesToWatch: [
        './test/misc/*.spec.js'
    ],
	screenshotPath: process.env.SCREENSHOT_PATH || './../errorShots/',
	plugins: {
        'wdio-screenshot': {}
    },

    beforeSession: function (config, capabilities, specs) {
        //console.log(capabilities,config);
        //TODO sv and large
        if( config ){

        }
        // let tagFlag = `${capabilities.tags}`;

        // if( !config.mochaOpts.grep ){
        //     config.mochaOpts.grep = '@both';
        // }

        // if((tagFlag == config.mochaOpts.grep)|(config.mochaOpts.grep == "@both")) {
        //     config.mochaOpts.grep = `${capabilities.tags}`;
        // } else {
        //     //process.exit(0)
        // }
    },

    beforeSuite: function (suite) {
    
    },

	before: function (capabilities, specs) {
        require('./prepare-browser').configure(browser);
    },

    beforeHook: function () {
    
    },

    beforeTest: function (test) {

    },

    afterCommand: function(commandName, args, result, error) {
        if( ! process.env.EXCLUDE_ALLURE && error ){
            if( ! process.env.EXCLUDE_URL ){
                AllureAdditions.addLatestUrl(`${commandName} ${args || ''} `,`Url at Error: ${commandName} ${error || ''} ${result || ''}` );
            }
        }
    },

    afterHook: function () {
        //TODO mark test pending if hook failed 
         const AllureAdditions = require('./allure-additions');

        if ( ! process.env.EXCLUDE_ALLURE ) {

            if( ! process.env.EXCLUDE_LIVE_CONFIG ){ 
                AllureAdditions.addLiveConfig();
            }

            if( ! process.env.EXCLUDE_URL ){
                AllureAdditions.addLatestUrl();
            }

            if( ! process.env.EXCLUDE_DEBUG ){
                AllureAdditions.addDebugDetails(false); 
            } 

            if( this.services.includes('sauce') && ! process.env.EXCLUDE_VIDEO ){
                AllureAdditions.addSauceLabsLinks(true,"show video");
            }

            if( ! process.env.EXCLUDE_SCREENSHOT ){
                AllureAdditions.addScreenShot(this.screenshotPath, true);
            }
        }       
    },

    afterTest: function(test){
       
    },

    after: function (result, capabilities, specs) {
    
    },

    afterSession: function (config, capabilities, specs) {

    },

    afterSuite: function (suite) {
    
    },

	onPrepare: function() {
		console.log(`Starting: ${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}`);
	},

	onComplete: function() {
		console.log(`Done: ${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}`);
	},

    onReload: function(oldSessionId, newSessionId) {
    
    },
};
