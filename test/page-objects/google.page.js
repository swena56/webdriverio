import BasePage from "./base.page";

// const _elements = {
// 	image: '#hplogo',
// 	search: 'input[title="Search"]',
// 	feeling_luck: "input[value*=Lucky]",
// 	submit: "input[value*=Google Search]",
// 	sign_button: '*=Sign in',
// };

class Google extends BasePage {

	get SEARCH(){ return $('input[name=q]'); }

	loadPage(){
		super.loadPage('https://www.google.com');
	}

	search(forText){
		// if(!forText){
		// 	throw new Error('need search string to search for in parameter 1');
		// }
		this.SEARCH.isExisting().should.equal(true,"Search input field does not exist");
		//expect(this.SEARCH.isExisting(),"Search input field did not exist").to.equal(true);
		this.SEARCH.setValue(forText);
		browser.keys("Enter");
		super.waitForPageLoad();
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