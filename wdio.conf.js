require("@babel/register");
const base = require('./conf/base.conf');
const sauce = require('./conf/base.sauce.conf');
const devices = require('./conf/sauce-labs.cap').getCaps(process.env.CAPS || 'list');

exports.config = {
	...base.config,
    ...sauce.config,
    capabilities: devices,
};