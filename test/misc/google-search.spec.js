import Google from "./../page-objects/google.page";

describe('google search', function () {

	it('should search for test and pick first page', function () {
		Google.loadPage();
		Google.search('test');
		// Google.clickFirstItem();
	});

	it('feeling lucky',()=>{
		Google.loadPage();
		// browser.click(Google._.search);
		// browser.keys("Tab");
		// browser.keys("Tab");
		// browser.keys("Tab");
		// browser.pause(1000);
		// browser.keys("Enter");
		// console.log(browser.getUrl());
		// //browser.pause(5000);
	});

	it('is logged in', () =>{
		Google.loadPage();
		// Google.login();
		// browser.pause(1000);
		//input[contains(@name,’tn’)]
		//expect('//input[contains(@type, email")]').to.be.there();
	});

});