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

/**
 * Adds an allure attachment containing an easy to read json dump of the live config used.
 */
exports.addLiveConfig = function(title='Live config') {

	const liveConfig = browser.execute(function () {
		return window.liveConfig;
	});

	if( liveConfig && liveConfig.value ){

		reporter.createAttachment(title,
			`<pre>${JSON.stringify(liveConfig.value, null, '\t')}</pre>`,
			"text/html");
	} else {
		throw new Error('Unable to obtain a live config');
	}
};

exports.addDescription = function(message, skipTest=false){
	reporter.addDescription(message);
	if( skipTest ){
		let Pending = require('../node_modules/mocha/lib/pending.js');
		throw new Pending(`${message}`);
	}
};

exports.elementScreenShot = function (element, title = null) {

	if (!element) {
		throw new Error('elementScreenShot needs an element for parameter 1');
	}

	element.isExisting().should.equal(true, 'elementScreenShot requires element to exist');

	const filename = `${browser.config.screenshotPath}/${element.selector}-${Math.random().toString(26).slice(2)}.png`;

	if (!title) {
		title = `Element ScreenShot: ${element.selector}`;
	}

	element.saveScreenshot(filename);
	const base64 = getImageBase64(filename);

	addAttachment(title, `<div>
				<p>${JSON.stringify(element.getSize()) || '' }</p>
				 <img src="data:image/png;base64, ${base64} " />
		   		</div>`,
	'text/html');

};

exports.addElementVisualCheck = function (elem, filename) {

	if (elem.isExisting()) {

		// TODO use browser config to define path
		// TODO add varsha's new visual automation code
		const folder = 'screenshots'; // browser.config.screenshotPath
		const size = elem.getSize() || { height: -1, width: -1 };

		const newPath = `./${folder}/${filename}.png`;
		const oldPath = `./${folder}/${filename}.old.png`;
		const difPath = `./${folder}/${filename}.diff.png`;

		if (fs.existsSync(newPath)) {
			fs.renameSync(newPath, oldPath);
		}

		try {
			elem.saveScreenshot(newPath);
		} catch (e) {
			logger.error('Failed to save screenshot');
			return false;
		}

		const newBase64 = getImageBase64(newPath);
		const oldBase64 = getImageBase64(oldPath);
		const imageDiff = getImageDiff(newPath, oldPath, difPath);
		const diffHTML = base64ToHtmlImage(imageDiff.base64, `Difference Image`);

		// TODO calculate pixel percentages

		let testName = 'not set';
		let testedBrowser = 'not set';

		let stats = {
			pixelDiff: imageDiff.diff,
			same_image: 'unknown',
			size: size,
		};

		addAttachment('Visual', `
				<div>
					<style>
					table, th, td {
					  border: 1px solid black;
					  border-collapse: collapse;
					  padding: 5px
					}
					</style>
					<div class='container' style="display: table;background-color:lightblue">
					<h3> Test Name : ${testName} </h3>
					<h3> Browser Name : ${testedBrowser} </h3>
					<p>Size: ${size.width} x ${size.height}</p>
					<div class="row"  style="display: table;background-color:lightblue">
						<div class="column" style ="float: left;width: 47.88%;padding: 5px">
							<h3>Reference Image</h3>
							${ base64ToHtmlImage(newBase64, 'New') }
						</div>
						<div class="column" style ="float: left;width: 47.88%;padding: 5px">
							<h3>Current Image</h3>
							${ base64ToHtmlImage(oldBase64, 'Old') } 
						</div>
						<div class="column" style ="float: left;width: 95%;padding: 5px">
							<h3>Difference Image</h3>
							${ diffHTML }
						</div>
					</div>
					<div>
						<h2>Comparison Results</h2>
						<table style="width:60%">
						  <tr>
							<th>Comparison Attributes</th>
							<th>Expected value</th> 
							<th>Actual Value</th>
						  </tr>
						  <tr>
							<td>misMatchPercentage</td>
							<td>0</td>
							<td></td>
						  </tr>
						  <tr>
							<td>isWithinMisMatchTolerance - 0.01</td>
							<td>true</td>
							<td></td>
						  </tr>
						  <tr>
							<td>isSameDimensions</td>
							<td>true</td>
							<td></td>
						  </tr>
						  <tr>
							<td>isExactSameImage</td>
							<td>true</td>
							<td></td>
						  </tr>
						</table>
					</div>
					</div>
				</div>`,
		'text/html');
	}
};

//TODO addImageComparison
exports.addImageComparison = function(result,args,TestName,referenceScreenShot,currentScreenShot,differenceScreenShot) {
	let allureReport = require('wdio-allure-reporter');
	let base64Img = require('base64-img');
	if (result && result[0] && result[0].misMatchPercentage) {
		//	let DimensionsWidth=args[1].viewports[0].width
		//	let DimensionsHeight=args[1].viewports[0].height
		let string = TestName.title.split("-");
		let splitString = string[1].split(":");
		let testedBrowser = string[0]
		let testName = splitString[0]
		let appView = splitString[1]

		let imageTo64_ref = base64Img
			.base64Sync(`Screenshot/reference/${referenceScreenShot}`)
			.replace('data:image/png;base64,', '');
		let imageTo64_cur = base64Img
			.base64Sync(`Screenshot/current/${currentScreenShot}`)
			.replace('data:image/png;base64,', '');
		let imageTo64 = base64Img
			.base64Sync(`Screenshot/difference/${differenceScreenShot}`)
			.replace('data:image/png;base64,', '');
		allureReport.createAttachment("Image Comparison", `
	<style>
	table, th, td {
	  border: 1px solid black;
	  border-collapse: collapse;
	  padding: 5px
	}
	</style>
	<div class='container' style="display: table;background-color:lightblue">
	<h3> Test Name : ${testName} </h3>
	<h3> Browser Name : ${testedBrowser} </h3>
	<div class="row"  style="display: table;background-color:lightblue">
		<div class="column" style ="float: left;width: 47.88%;padding: 5px">
			<h3>Reference Image</h3>
			<img src="data:image/png;base64, ${imageTo64_ref} " alt="ref" style="width:100%">
		</div>
		<div class="column" style ="float: left;width: 47.88%;padding: 5px">
			<h3>Current Image</h3>
			<img src="data:image/png;base64, ${imageTo64_cur} " alt="cur" style="width:100%"> 
		</div>
		<div class="column" style ="float: left;width: 95%;padding: 5px">
			<h3>Difference Image</h3>
			<img src="data:image/png;base64, ${imageTo64} " alt="diff" style="width:100%">
		</div>
	</div>
	<div>
		<h2>Comparison Results</h2>
<table style="width:60%">
  <tr>
    <th>Comparison Attributes</th>
    <th>Expected value</th> 
    <th>Actual Value</th>
  </tr>
  <tr>
    <td>misMatchPercentage</td>
    <td>0</td>
    <td>${result[0].misMatchPercentage}</td>
  </tr>
  <tr>
    <td>isWithinMisMatchTolerance - 0.01</td>
    <td>true</td>
    <td>${result[0].isWithinMisMatchTolerance}</td>
  </tr>
  <tr>
    <td>isSameDimensions</td>
    <td>true</td>
    <td>${result[0].isSameDimensions}</td>
  </tr>
  <tr>
    <td>isExactSameImage</td>
    <td>true</td>
    <td>${result[0].isExactSameImage}</td>
  </tr>
</table>
	</div>
	</div>
`, "text/html");

	}
};
