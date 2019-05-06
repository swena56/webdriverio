## Webdriverio - Browser Testing ##

## Todo ##
+ small view
	+ headless
	+ saucelabs
	+ per test basis
+ large view
	+ headless
	+ saucelabs
	+ per test basis
+ allure 
+ highlight
+ clean up repl
+ devtools
	https://webdriver.io/docs/devtools-service.html
+ eslint
+ text search for tests
+ ie browsers
+ test PageUtil page object
+ add local browsers - ie, edge, safari, android, ios, firefox, chrome
+ selenium install args instead of modifying default-config
+ chrome extensions
+ firefox extensions
+ debug settings
	https://webdriver.io/docs/debugging.html
+ browser mob
	https://github.com/lightbody/browsermob-proxy
	https://webdriver.io/docs/proxy.html

## Page Objects

In the test/_ folder are Page Objects - these are meant to abstract the XPath Selector syntax away from your tests, so if one of those paths changes, you don't need to change all your tests, just the page object. 

## Headless 

1) Chrome
2) Firefox
3) Chromium Devtools

All of the headless configs live in the conf folder, and are an extention of the base config `base.conf.js`.
There are various env variables that can be used, to modify how the headless testing runs.
Suite grouping is defined in the base config.

Devtools just enables the chrome debugging tools, and communicates with the browser over port 9222.

| ENV VAR       |  Purpose  	|
| ------------- | ------------- |
| MAX_INSTANCES | max number of browser instances to be run at one time. |
| BASE_URL | Defaults to https://www.bestbuy.com, but could be changed by setting this variable |
| LOG_LEVEL | Defaults to silent, but could be changed to error, verbose, etc - the level of logging used for selenium |
| WAIT_FOR_TIMEOUT | Adjust duration of wait for timeout |
| WAIT_FOR_INTERVAL | Adjust duration of wait for interval timeout |
| BAIL | Number of tests to fail before just giving up, defaults to 0 |
| USER_AGENT | Small user agent |
| FIREFOX_BIN | When not set the latest firefox binary is used from puppeteer |
| CHROME_BIN | When not set the latest chromium binary is used from puppeteer |
| EXCLUDES | Defines what tests should not get run |
| AB_CHANNEL | Set the control group of ab tests - 1 disables.  Disables by default, set to 'off' to include ab tests. |
| SHOW_UI | Show browser ui for headless testing |