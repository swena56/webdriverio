import BasePage from "./base.page";

class PageUtil extends BasePage {

	get links(){

	}

	get tagIds(){

	}

	get comments(){

	}

	/**
	* Returns an array of browser objects, that start with string
	* Based on html ids
	*/
	getComponents(startString="shop"){
		const componentIds = browser.execute( function(startString){
		  return Array.apply([], document.querySelectorAll(`[id^="${startString}"]`) ).map( o => o.id );
		},startString);
		if( componentIds && componentIds.value ){
			return componentIds.value.map( o => browser.$(`#${o}`) );
		} else {
			return [];
		}
	}

	setCookies(region=null){
		if(process.env.REGION){
			region = process.env.REGION;
		}
		if(region && (region == 'w' || region == 'e')){
			browser.setCookie( { name: 'bby_cbc_lb', value: `p-browse-${region}`});
			browser.refresh();
		}
	}


	scrollIntoViewSelector(selector) {
		if( this.elementExists(selector) ){
			browser.execute(`document.querySelector('${selector}').scrollIntoView()`);
		}
		return this;
	}
	
	isElementExpanded(element){
		let results = true;

		expect( element && element.isExisting(),"isElementExpanded expects element to exist before checking the attribute aria-expanded").to.equal(true);

		try{
			let status = element.getAttribute('aria-expanded');

			if( status === 'false' || status === false ) {
				results = false;
			}
		} catch (e) {
		}

		browser.pause(2000);

		return results;
	}

	waitForExpanded(element){
		browser.waitUntil( () =>{
			return this.isElementExpanded( element )
		});
		this.waitForPageLoad();
		browser.pause(2000);
	}

	scrollToElement(element, speed=2000){
		browser.execute(function(elem,speed){
			$('html,body').animate({
				scrollTop: $(elem).offset().top
			}, speed);
		},element,speed);
		this.waitForPageLoad();
	}
}

export default new PageUtil();