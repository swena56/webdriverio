export default class BasePage {

	loadPage (url='/') {
        browser.url(url);
        this.waitForPageLoad();
	}

	waitForPageLoad(extraWaitTime=0) {
		const WAIT_TIME = 180000;

		browser.waitUntil(
			() => browser.execute('return document.readyState') === 'complete', 
			WAIT_TIME,
			`Page not loaded completely within ${WAIT_TIME/1000} seconds`
		);

		if( extraWaitTime > 0 ){
			browser.pause(extraWaitTime);
		}
	}
}