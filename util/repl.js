import Launcher from '@wdio/cli';

const wdio = new Launcher({}, {});
wdio.run().then((code) => {
    process.exit(code);
}, (error) => {
    console.error('Launcher failed to start the test', error.stacktrace);
    process.exit(1);
});