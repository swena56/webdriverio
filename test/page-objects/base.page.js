const MIN_WAIT_TIME= 10000
const MAX_WAIT_TIME= 360000

export default class BasePage {

	loadPage (url='/') {
        browser.url(url);
        this.waitForPageLoad();
	}

	waitForPageLoad() {
		var DOMState='';
		browser.waitUntil(function () {
			DOMState = browser.execute('return document.readyState');
			return DOMState.value === 'complete' || !DOMState.value
		}, MAX_WAIT_TIME,'Page not loaded completely within 180 seconds');
	}
}