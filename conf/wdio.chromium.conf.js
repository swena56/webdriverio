require("@babel/register");
const base = require('./base.conf');
let baseArgs = ! process.env.SHOW_UI ? ['--headless', '--disable-gpu'] : [];

if( ! require('fs').existsSync('node_modules/puppeteer') ){
    throw new Error('Requires puppeteer to be installed');
}

function addDevice(deviceName='list'){

    const deviceSpecsArray = require('puppeteer').devices;
    const specs = deviceSpecsArray[deviceName];

    if( deviceName.includes('list') || ! specs ){
        
        console.log(`${JSON.stringify(deviceSpecsArray.map( o => o.name ), null, '\t')}`);
        console.log(`'${deviceName}' <- Invalid Device, select one from this list`);
        //throw new Error(`Invalid Device: ${deviceName}`);
        process.exit();
    }

    let mobileDevice = {
        browserName: 'chrome',
        "goog:chromeOptions": {
            binary: `${require('puppeteer').executablePath()}`,
            mobileEmulation:{
                userAgent: specs.userAgent,
                deviceMetrics: {
                    width: specs.viewport.width,
                    height: specs.viewport.height,
                    pixelRatio: specs.viewport.deviceScaleFactor,
                },
            },
            args: [ 
                ...baseArgs,
                '--disable-infobars',
                '--fast-start',
                `--window-size=${specs.viewport.width},${specs.viewport.height}`,
                `--window-position=0,0`,
            ],
        }
    };

    return mobileDevice;
}

let devices = [];

/*
    CAPS="iPhone 4 landscape,Nexus 5,iPhone 8 Plus,Galaxy S5"
*/
if( process.env.CAPS && process.env.CAPS.length ){
    let caps = process.env.CAPS.split(',');
    for (var i = caps.length - 1; i >= 0; i--) {
        console.log(caps[i]);
        devices.push(addDevice(caps[i]));
    }
}

if( ! devices.length ){
    devices.push({
        browserName: 'chrome',
        "goog:chromeOptions": {
            binary: `${require('puppeteer').executablePath()}`,
            args: [ 
                ...baseArgs,
                '--disable-infobars',
                '--fast-start',
            ],
        }
    });
}

exports.config = {
	...base.config,
    services: ['selenium-standalone'],
    capabilities: devices,
};
