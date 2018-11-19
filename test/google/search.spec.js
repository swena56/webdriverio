import Google from "./google.page";

describe('google search', function () {

	const google = new Google();

	it('should search for test and pick first page', function () {
		google.loadPage();
		google.search('test');
		google.clickFirstItem();
	});

	it('feeling lucky',()=>{
		google.loadPage();
		browser.click(google._.search);
		browser.keys("Tab");
		browser.keys("Tab");
		browser.keys("Tab");
		browser.pause(1000);
		browser.keys("Enter");
		console.log(browser.getUrl());
		//browser.pause(5000);
	});

	it.only('is logged in', () =>{
		google.loadPage();
		google.login();
		browser.pause(1000);
		//input[contains(@name,’tn’)]
		//expect('//input[contains(@type, email")]').to.be.there();
		
	});

});