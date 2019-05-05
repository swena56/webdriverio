browser.addCommand("getUrlAndTitle", function (customVar) {
	return {
		url: this.getUrl(),
		title: this.getTitle(),
		customVar: customVar
	};
});

browser.addCommand("loadPage", function(){
	browser.url(this.baseUrl);
});

/**
 * adds a red highlight around elements you would like to select
 * @param {String} selector css or xpath selector
 */
browser.addCommand('highlight', function(selector, color='red') {

	function highlightElement(selector) {
		// const xPathToCss = require('xpath-to-css');
		// if (selector.substr(0, 1) === '/') {
		// 	if (selector.includes('text')) {
		// 		console.log(`Cannot highlight element that uses "text" value as part of its selector`)
		// 	} else {
		// 		selector = xPathToCss(selector)
		// 	}
		// }
		const result = browser
			.execute(function(selector,color) {
				if (!window.highlighted) {
					window.highlighted = []
				}
				let element = window.$(selector);
				if (element.length > 0) {
					element.css({
						'border-color': color,
						'border-width': '3px',
						'border-style': 'solid',
						'border-radius': '5px'
					});
					window.highlighted.push(selector)
				}
				return element.length
			}, selector, color);

		if (result.value === 0) {
			console.log(`Element not found!`)
		}
	}

	if (selector) {
		highlightElement(selector)
	} else {
		const element = this.element(selector);
		if (element.state === 'success') {
			highlightElement(element.selector)
		}
	}
});

browser.addCommand("animate", function (elementToAnimate) {
	browser.execute(function(elementToAnimate){

		function loadCss(filename) {
			var cssNode = document.createElement("link");
			cssNode.setAttribute("rel", "stylesheet");
			cssNode.setAttribute("type", "text/css");
			cssNode.setAttribute("href", filename);
			document.getElementsByTagName("head")[0].appendChild(cssNode);
		}

		loadCss('https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css');

		var elements = document.querySelectorAll(elementToAnimate);
		elements.forEach(function(item){
			item.classList += " animated bounce infinite delay-2s";
		});

	},elementToAnimate);
});

browser.addCommand("border", function (elementToAnimate) {
	browser.execute(function(elementToAnimate){
		let elements = document.querySelectorAll(elementToAnimate);
		elements.forEach(function(item){
			//TODO could be a situation where it may overwrite style, need a check
			item.setAttribute("style", "border: solid red 3px;");
		});
	},elementToAnimate);

	if( $(elementToAnimate).isExisting() ){
		return $(elementToAnimate);
	}
});

browser.addCommand("waitAndClick", function (selector) {
	let result;
	try {
		let element = this == browser ? this.$(selector) : this;
		element.waitForExist();
		element.waitForEnabled();
		element.waitForVisible();
		result = element.click();
		browser.pause(1000);
	} catch (err) {
		console.log('browser.waitAndClick() failed');
	}
	return result;
}, true);

//deprecated warning - use as last resort
browser.addCommand("cursorClick", function(selector) {
	let element = this == browser ? this.$(selector) : this;
	element.leftClick().pause(2000);
	return element;
});

browser.addCommand("home",function(){
	return Promise.all([
		this.url('https://www.gogle.com')
	]);
});

browser.addCommand("mobile", function () {
	this.pause(2000);
	this.scroll('footer');
	this.click('*=Mobile Site');
	this.scroll('header');
});

browser.addCommand("getUrlAndTitle1", async function() {
	return Promise.all([
		this.getUrl(),
		this.getTitle()
	]);
});

browser.on('error', function(e) {
	console.log(`[!]${e.body.value.class}`);
	console.log(`[!]${e.body.value.message}`);
});