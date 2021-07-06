const assert = require('assert');
const express = require('express');

const {ResponseService} = require('./ResponseService');
const {AbstractHttpError} = require('../errors/AbstractHttpError');
const {AbstractService} = require('./AbstractService');

class AppService extends AbstractService {
    /**
     * @type {import("express/lib/express")}
     */
    #express;

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
        this.#express = express();
        this.#express.use(express.json());
    }

    /**
     * Start the server.
     */
    start() {
        this.#express.listen(this.#config.port);
        console.log(`Started on the port ${this.#config.port}`);
    }

    /**
     * @param {AbstractEndpoint[]} endpoints
     */
    registerEndpoints(endpoints) {
        assert(Array.isArray(endpoints));

        // registering routes with Express
        for (let i = endpoints.length - 1; i >= 0; i--) {
            const endpoint = new endpoints[i](this);

            const action = endpoint.method();
            this.#express[action](
                endpoint.path(),
                this.handleAction(endpoint)
            );
        }
    }

    /**
     * @param {AbstractEndpoint} endpoint
     * @returns {Function}
     */
    handleAction(endpoint) {
        return (req, resp) => {
            const response = ResponseService.make(resp);

            let res;
            try {
                res = endpoint.action(req, resp);
            } catch (err) {
                // handle endpoint errors
                if (err instanceof AbstractHttpError) {
                    response.sendError(
                        err.message,
                        err.getStatus()
                    );
                } else {
                    throw err;
                }
            }

            response.send(res);
        };
    }
}

module.exports = {
    AppService
};
