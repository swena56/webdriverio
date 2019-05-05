import BasePage from "./base.page";

// const _elements = {
// 	image: '#hplogo',
// 	search: 'input[title="Search"]',
// 	feeling_luck: "input[value*=Lucky]",
// 	submit: "input[value*=Google Search]",
// 	sign_button: '*=Sign in',
// };

class Google extends BasePage {

	loadPage(){
		super.loadPage('https://www.google.com');
	}

	search(forText){
		if(!forText){
			throw new Error('need search string to search for in parameter 1');
		}

		//expect(_elements.search,"Search input field did not exist").to.be.there();
		//browser.setValue(_elements.search,'test');
		//expect(browser.getValue(_elements.search),"Does not have the expected text").to.equal(forText);
		browser.keys("Enter");
	}

	clickFirstItem(){
		// const items = browser.$$('//a/h3');
		// if( items.length ){
		// 	items[0].click();
		// }
	}

	login(){
		//$(_elements.sign_button).click();
		//console.log(browser.getUrl());
	}
}

export default new Google();