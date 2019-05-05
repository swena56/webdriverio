import BasePage from "./base.page";

class MicrosoftPage extends BasePage {

	get SIGN_IN(){ return $('*=Sign in'); }
	get LOGIN_IN_ICON(){ return $('#mectrl_headerPicture'); }

	loadPage(){
		super.loadPage('https://www.microsoft.com');
	}

	login(){

		// if( process.env.MICROSOFT_USERNAME && process.env.MICROSOFT_PASSWORD ){

		// }
		//browser.debug();
	}
}

export default new MicrosoftPage();