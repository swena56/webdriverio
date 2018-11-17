/*
	Example usage:
		Inside of wdio.conf.js
		require('./util/allure-additions').addSauceLabsLinks();
		require('./util/allure-additions').addLatestUrl();
 */

exports.addSauceLabsLinks = function(useAuthToken=true,video=false){
	let reporter = require('wdio-allure-reporter');
	const crypto = require('crypto');

	const job_id = `${browser.sessionId}` || new Error("Not a valid sessionId");

	let baseURL = `https://app.saucelabs.com/tests/${job_id}`;

	if( !process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY ){
		console.log("Missing env vars: SAUCE_USERNAME,SAUCE_ACCESS_KEY");
		return;
	}

	const hash = crypto.createHmac('md5', `${process.env.SAUCE_USERNAME}:${process.env.SAUCE_ACCESS_KEY}`)
		.update(job_id)
		.digest('hex');

	let authToken = (useAuthToken) ? `?auth=${hash}` : "";

	//TOOD check if extended debugging is enabled before showing Network dump link
	reporter.createAttachment("Sauce Labs Quick Navigation",`
			<div>
				${ (!useAuthToken) ? "Sauce labs credentials are required." : "" }
			<ul>
				<li><a target="_blank" href="${baseURL}${authToken}">Sauce Labs</a></li>
				<li><a target="_blank" href="${baseURL}/watch${authToken}">Video</a></li>
				<li><a target="_blank" href="${baseURL}/network${authToken}">Network Dump</a></li>
			</ul>

			<video controls="" autoplay="" name="media" width="100%">
				<source src="https://assets.saucelabs.com/jobs/${job_id}/video.mp4?auth=${hash}" type="video/mp4">
			</video>
			</div>
		`,"text/html");

	if( useAuthToken && video ){
		reporter.createAttachment("Video Replay",`
			<div>
				<video controls="" autoplay="" name="media" width="100%">
					<source src="https://assets.saucelabs.com/jobs/${job_id}/video.mp4?auth=${hash}" type="video/mp4">
				</video>
			</div>
	`,"text/html");
	}

};

exports.addLatestUrl = function(additionalInfo="",title="Latest URL"){
	let url;
	try{
		url = browser.getUrl();
	} catch (e) {}

	if( url ){
		let reporter = require('wdio-allure-reporter');
		reporter.createAttachment(title,`
			   <div>
				  <a target="_blank" href="${url}"> ${url} </a>
				  <div>${additionalInfo}</div>
			   </div>
			`,"text/html");
	} else {
		//print error
	}
};

exports.addDebugDetails = function(writeToSauceLabs=true){

	let SID; try { SID = browser.getCookie('SID'); } catch (e) {}
	let title = "Debug Report";

	if( SID && SID.value ){
		let reporter = require('wdio-allure-reporter');
		reporter.createAttachment(title,`
		   <div>
		   	 <div>SID: ${SID.value}</div>
		   </div>
		`,"text/html");

		if( writeToSauceLabs ){

			let https = require('https');

			let test_id = browser.sessionId;

			let bodyString = JSON.stringify({
				"custom-data": {
					"test-defect": "unknown",
					"debug-report" : `SID: ${SID.value}`
				}
			});

			let headers = {
				'Authorization': 'Basic ' + new Buffer(process.env.SAUCE_USERNAME + ':' + process.env.SAUCE_ACCESS_KEY).toString('base64'),
				'Accept': 'application/json',
				'Accept-Charset': 'utf-8',
				'Content-Type': 'application/json',
				'Content-Length': bodyString.length
			};

			let path = `/rest/v1/${process.env.SAUCE_USERNAME}/jobs/${test_id}`;

			let callback = function(response) {
				let str = '';

				//another chunk of data has been recieved, so append it to `str`
				response.on('data', function(chunk) {
					str += chunk;
				});

				//the whole response has been recieved, so we just print it out here
				response.on('end', function() {
					//console.log(str);
				});
			};

			https.request({
					host: 'saucelabs.com',
					port: 443,
					method: 'PUT',
					headers: headers,
					path: path,
				}, callback
			).write(bodyString);
		}
	}
};

//parameter 1: this.screenShotDir - this parameter is defined in wdio.config (required)
//parameter 2: Boolean, if true - add full screenshot
exports.addScreenShot = function(screenShotDir, isFullDocument=false) {

	if( !screenShotDir ){
		throw new Error('addSceenShot needs the screenShotDir for parameter 1');
	}

	let reporter = require('wdio-allure-reporter');
	reporter.feature('Full Document Screenshot');

	let documentSize = browser.execute(function () {
		var body = document.body,
			html = document.documentElement;
		return {
			width: Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth),
			height: Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight)
		};
	});

	browser.setViewportSize(documentSize.value);
	browser.pause(1000);

	//get current test browser and clean it, to use it as file name
	let deviceName = browser.desiredCapabilities.build;
	let timestamp = new Date().toJSON().replace(/:/g, '-');
	let filename = 'TESTFAIL_' + deviceName + '_' + timestamp + '.png';
	const path = require('path');
	let filePath = path.join(screenShotDir, filename);

	reporter.createAttachment('screenshot',browser.saveScreenshot(filePath), 'image/png');

	if( isFullDocument ) {
		let base64DocumentImage = browser.saveDocumentScreenshot(filePath);

		reporter.createAttachment("Full Document ScreenShot (png)", `
		   <div>
				 <img src="data:image/png;base64, ${base64DocumentImage} " />
		   </div>
		`, "text/html");
	}
};