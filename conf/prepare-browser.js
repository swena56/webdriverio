"use strict";

const logger = require( '@wdio/logger' ).default( browser.config.capabilities.browserName );

exports.configure = function (browser) {

	const chai = require('chai');
	const options = {defaultWait: 35000};
	const chaiWebdriver = require('chai-webdriverio').default;
	chai.use(chaiWebdriver(browser,options));
	global.expect = chai.expect;
	global.assert = require('assert');
	chai.config.includeStack  = true;
	chai.config.showDiff = true;
	chai.should();

	require("@babel/register");

	browser.addCommand('highlight', function(selector, color='red') {

		function highlightElement(selector) {
			const xPathToCss = require('xpath-to-css');
			if (selector.substr(0, 1) === '/') {
				if (selector.includes('text')) {
					console.log(`Cannot highlight element that uses "text" value as part of its selector`)
				} else {
					selector = xPathToCss(selector)
				}
			}
			const result = browser
				.execute(function(selector,color) {
					if (!window.highlighted) {
						window.highlighted = []
					}
					let element = window.$(selector);
					if (element.length > 0) {
						element.css({
							'border-color': color,
							'border-width': '3px',
							'border-style': 'solid',
							'border-radius': '5px'
						});
						window.highlighted.push(selector)
					}
					return element.length
				}, selector, color);

			if (result.value === 0) {
				console.log(`Element not found!`)
			}
		}

		if (selector) {
			highlightElement(selector)
		} else {
			const element = this.element(selector);
			if (element.state === 'success') {
				highlightElement(element.selector)
			}
		}
	});

	browser.addCommand('removeHighlights', () => {
        return browser.execute(function(selector) {
            if (window.highlighted) {
                window.highlighted.forEach(function(selector) {
                    window.$(selector)
                        .css({
                            'border-width': '0px'
                        })
                })
                window.highlighted = []
            }
        })
    });

	browser.addCommand( 'assert', function ( message = false ) {
		if( ! this ){
			throw new Error('Calling assert on undefined');
		}
		this.isExisting().should.equal( true, ( message ) ? `${message} - selector: ${this.selector} does not exist` : `selector: ${this.selector} does not exist` );
		return this;
	}, true );

	browser.addCommand( 'injectClick', function ( index = -1 ) {
		this.assert();

		if ( this.isExisting() ) {

			const results = browser.execute( ( element, index ) => {
				let clickMe = document.querySelector( element );

				if ( index >= 0 ) {
					clickMe = document.querySelectorAll( element )[index];
				}

				if ( clickMe ) {
					clickMe.click();
				}
				return clickMe;
			}, this.selector, index );

			results.should.not.equal( null, `injectClick failed to click '${this.selector}'` );
		}
	}, true );
	
	browser.addCommand( 'getOsAndBrowserInformation', () => {
		const details = [];
		browser.capabilities.browserName && details.push( browser.capabilities.browserName );
		browser.capabilities.version && details.push( browser.capabilities.version );
		browser.capabilities.platformName && details.push( browser.capabilities.platformName );
		browser.capabilities.platform && details.push( browser.capabilities.platform );
		browser.capabilities.deviceName && details.push( browser.capabilities.deviceName );

		return details.join( '-' );
	} );

    /**
    * sets the web browser position, either left or right, based on personal config "browserPosition" setting
    * @param {String} position right or left
    * @return {Promise}
    */
   browser.addCommand('reposition', position => {
      let results = browser.execute(function() {
         return {
            width: window.screen.availWidth,
            height: window.screen.availHeight
         };
      });

      const screenSize = results.value;
      return browser
         .windowHandleSize({
            width: screenSize.width / 2,
            height: screenSize.height
         })
         .windowHandlePosition({
            x: position === 'right' ? screenSize.width / 2 : 0,
            y: 0
         })
   });
};
