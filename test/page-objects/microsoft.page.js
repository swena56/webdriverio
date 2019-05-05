import BasePage from "./base.page";

class MicrosoftPage extends BasePage {

	get SIGN_IN(){ return $('*=Sign in'); }
	get LOGIN_IN_ICON(){ return $('#mectrl_headerPicture'); }

	loadPage(){
		super.loadPage('https://www.microsoft.com');
	}

	login(username,password){

		
	}
}

export default new MicrosoftPage();