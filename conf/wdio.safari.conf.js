let base = require('./base.conf');

exports.config = {
	...base.config,
	services:['selenium-standalone'],
	capabilities: [
		{ browserName: 'safari' },
	],
};