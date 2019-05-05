import BasePage from "./base.page";

class Google extends BasePage {

	get SEARCH(){ return $('input[name=q]'); }
	get SIGNIN_BUTTON(){ return $('*=Sign in'); }
	get FEELING_LUCKY_BUTTON(){ return $("input[value*=Lucky]"); }
	// 	image: '#hplogo',
	// 	submit: "input[value*=Google Search]",

	loadPage(){
		super.loadPage('https://www.google.com');
	}

	search(forText){
		expect(forText,'need search string to search for in parameter 1');
		this.SEARCH.isExisting().should.equal(true,"Search input field does not exist");
		this.SEARCH.setValue(forText);
		browser.keys("Enter");
		super.waitForPageLoad();
	}

	clickFirstItem(){
		const items = browser.$$('//a/h3');
		if( items.length ){
			items[0].click();
		}
	}

	login(){
		this.SIGNIN_BUTTON.isExisting().should.equal(true,"Could not find the sign in button");
		this.SIGNIN_BUTTON.click();
	}
}

export default new Google();