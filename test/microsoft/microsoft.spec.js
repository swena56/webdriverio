import Microsoft from "./../page-objects/microsoft.page";

describe('Microsoft', function () {

	it('should login', function () {
		Microsoft.loadPage();
		Microsoft.login();
		browser.debug();
	});
});