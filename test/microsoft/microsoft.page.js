import BasePage from "../base.page";

const _elements = {
	signIn: '*=Sign in'
};

export default class Microsoft extends BasePage {

	get _(){
		return _elements;
	}

	constructor(props) {
		super(props);
		global.microsoft = this; //debug
	}

	loadPage(){
		new BasePage().loadPage('https://www.microsoft.com');
	}

	login(){

		if( process.env.MICROSOFT_USERNAME && process.env.MICROSOFT_PASSWORD ){

		}
		//browser.debug();
	}
}