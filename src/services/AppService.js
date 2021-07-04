const assert = require('assert');
const express = require('express');

const {AbstractService} = require('./AbstractService');

class AppService extends AbstractService {
    /**
     * @type {import("express/lib/express")}
     */
    #app;

    /**
     * @type {import("../../config/dev")}
     */
    #config;

    /**
     * @param {import("../../config/dev")} config
     */
    setConfig(config) {
        assert(typeof config === 'object');

        this.#config = config;
    }

    /**
     * App's init.
     */
    init() {
        this.#app = express();
    }

    /**
     * Start the server.
     */
    start() {
        this.#app.listen(this.#config.port);
    }

    /**
     * @param {AbstractEndpoint[]} endpoints
     */
    registerEndpoints(endpoints) {
        assert(Array.isArray(endpoints));

        for (let i = endpoints.length - 1; i >= 0; i--) {
            const endpoint = new endpoints[i]();

            // registering routes with Express
            const action = endpoint.method();
            this.#app[action](
                endpoint.path(),
                endpoint.action.bind(endpoint)
            );
        }
    }
}

module.exports = {
    AppService
};
