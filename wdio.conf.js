require("@babel/register");
const base = require('./conf/base.conf');
let baseArgs = ! process.env.SHOW_UI ? ['--headless', '--disable-gpu'] : [];

exports.config = {
	...base.config,
    services: ['selenium-standalone'],
    capabilities: [
        {
            browserName: 'chrome',
            "goog:chromeOptions": {
                args: [ 
                    ...baseArgs,
                ],
            }
        }
    ],
}
