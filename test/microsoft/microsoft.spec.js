import Microsoft from "./microsoft.page";

describe('Microsoft', function () {

	const microsoft = new Microsoft();

	it('should login', function () {
		microsoft.loadPage();
		microsoft.login();
	});
});