browser.addCommand("getUrlAndTitle", function (customVar) {
	return {
		url: this.getUrl(),
		title: this.getTitle(),
		customVar: customVar
	};
});

browser.addCommand("loadPage", function(){
	browser.url(this.baseUrl);
});

browser.addCommand("animate", function (elementToAnimate) {
	browser.execute(function(elementToAnimate){

		function loadCss(filename) {
			var cssNode = document.createElement("link");
			cssNode.setAttribute("rel", "stylesheet");
			cssNode.setAttribute("type", "text/css");
			cssNode.setAttribute("href", filename);
			document.getElementsByTagName("head")[0].appendChild(cssNode);
		}

		loadCss('https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css');

		var elements = document.querySelectorAll(elementToAnimate);
		elements.forEach(function(item){
			item.classList += " animated bounce infinite delay-2s";
		});

	},elementToAnimate);
});

browser.addCommand("border", function (elementToAnimate) {
	browser.execute(function(elementToAnimate){
		let elements = document.querySelectorAll(elementToAnimate);
		elements.forEach(function(item){
			//TODO could be a situation where it may overwrite style, need a check
			item.setAttribute("style", "border: solid red 3px;");
		});
	},elementToAnimate);

	if( $(elementToAnimate).isExisting() ){
		return $(elementToAnimate);
	}
});

browser.addCommand("home",function(){
	return Promise.all([
		this.url('https://www.gogle.com')
	]);
});

browser.addCommand("mobile", function () {
	this.pause(2000);
	this.scroll('footer');
	this.click('*=Mobile Site');
	this.scroll('header');
});

browser.addCommand("getUrlAndTitle1", async function() {
	return Promise.all([
		this.getUrl(),
		this.getTitle()
	]);
});

browser.on('error', function(e) {
	console.log(`[!]${e.body.value.class}`);
	console.log(`[!]${e.body.value.message}`);
});