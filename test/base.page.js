
const MIN_WAIT_TIME= 10000
const MAX_WAIT_TIME= 360000

export default class BasePage {

	loadPage (url) {
        browser.url(url);
        this.waitForPageLoad();
		return this;
	}

	waitForPageLoad() {
		var DOMState='';
		browser.waitUntil(function () {
			DOMState = browser.execute('return document.readyState');
			return DOMState.value === 'complete' || !DOMState.value
		}, MAX_WAIT_TIME,'Page not loaded completely within 180 seconds');
	}

	waitForSelector(selector) {
		this.waitForPageLoad();
		browser.waitUntil(function () {
			return browser.isVisible(selector)
		},MAX_WAIT_TIME, `Selector is not Visible: ${selector}`);
	}

	waitUntilSelectorVisible (selector) {
		browser.waitForVisible(selector, MAX_WAIT_TIME);
		this.waitForPageLoad();
		return this;
	}

	waitUntilSelectorNotVisible(selector){
		if( this.isElementVisible(selector) ) {
			browser.waitUntil(
				() => {
					return !browser.$(selector).isVisible();
				},
				MIN_WAIT_TIME,
				`waitUntilSelectorNotVisible failed for selector ${selector}`
			);
		}

		this.waitForPageLoad();

		return this;
	}

	scrollIntoViewSelector(selector) {
		if( this.elementExists(selector) ){
			browser.execute(`document.querySelector('${selector}').scrollIntoView()`);
		}
	}

	checkDeviceView(){
	}

	getOsAndBrowserInformation() {
		return browser.desiredCapabilities.build;
	}

	clickLinkAndVerifyTargetPageUrl(linkSelector, targetPageurl, message){
		browser.click(linkSelector);
		this.waitForPageLoad();
		expect(browser.getUrl().includes(targetPageurl)).to.equal(true, `${message}}`);
		browser.back();
		this.waitForPageLoad();
	}

	selectLink(textValue, selector) {
		if (selector) {
			return browser.element(`//${selector}[contains(text(), "${textValue}")]`)
		} else {
			return browser.element(`//a[contains(text(), "${textValue}")] | //strong[contains(text(), "${textValue}")] | //span[contains(text(), "${textValue}")] | //button[contains(text(), "${textValue}")]`)
		}
	}

	clickSelector(selector){
		let element = browser.$(selector);
		if( element.isExisting() ){

			if( ! element.isVisible() ){
				this.scrollIntoViewSelector(selector);
			}

			try{
				element.click();
			} catch (e) {
				this.clickSelectorIndex(selector);
			}
		} else {

			//last resort, click by text if selector exists
			let clickByTextElement = browser.$(`*=${selector}`);
			if( clickByTextElement.isExisting() ){
				clickByTextElement.click();
			} else {
				expect(selector,`Selector did not exist: ${selector}`).to.be.there();
			}
		}

		this.waitForPageLoad();
		return this;
	}

	clickSelectorIndex(selector,index=0){
		let results = browser.execute(function (selector,index) {
			var items = $(selector);
			if( items && items.length ){
				items.get(index).click();
				return true;
			}
			return false;
		},selector,index);

		expect(results && results.value,`basePage.clickSelectorIndex failed for selector: ${selector} index: ${index}`).to.equal(true);

		this.waitForPageLoad();
		return this;
	}

	elementExists(selector) {
		let exists = true
		let el =  browser.element(selector)
		if (el.type === "NoSuchElement") {
			exists = false
		}
		return exists;
	}

	isElementVisible(element){
		if( this.elementExists(element) && browser.$(element).isVisible() ){
			return true;
		}
		return false;
	}
}