describe('Webdriverio', function () {

	it('Load API page', function () {
		browser.url('https://webdriver.io/docs/api.html');
		//expect($('.headerTitle').isExisting());
		browser.pause(2000);
	});
});