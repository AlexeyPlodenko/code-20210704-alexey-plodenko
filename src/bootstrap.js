const yargs = require('yargs/yargs')
const assert = require('assert');

const {AppService} = require('./services/AppService');
const config = {
    dev: require('../config/dev')
};
const {endpoints} = require('./endpoints/index');
const {dump} = require('./helpers');

global.dump = dump;

function bootstrap() {
    const env = yargs.env ? yargs.env : 'dev';
    assert(env in config);

    const app = new AppService();
    app.init();
    app.setConfig(config[env]);
    app.registerEndpoints(endpoints);
    app.start();

    return app;
}

module.exports = {
    bootstrap
}
