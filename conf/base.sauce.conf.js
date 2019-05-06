
if( ! process.env.SAUCE_USERNAME || ! process.env.SAUCE_ACCESS_KEY ){
	throw new Error('Both SAUCE_USERNAME and SAUCE_ACCESS_KEY environment variables need to be set');
}

exports.config = {
	services: ['sauce'],
	user: process.env.SAUCE_USERNAME,
	key: process.env.SAUCE_ACCESS_KEY,
	region: 'us',
	sauceConnect: process.env.SAUCE_CONNECT || false,
	sauceConnectOpts: {},
};