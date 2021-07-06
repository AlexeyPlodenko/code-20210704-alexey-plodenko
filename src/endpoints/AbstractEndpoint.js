const assert = require('assert');

const {Abstract} = require('../services/Abstract');

/**
 * @type {string[]}
 */
const methods = ['get', 'post'];

/**
 * @property {Function} method
 * @property {Function} path
 * @property {Function} action
 */
class AbstractEndpoint extends Abstract {
    /**
     * @type {AppService}
     */
    #app;

    /**
     * @returns {AppService}
     */
    get app() {
        return this.#app;
    }

    /**
     * Constructor.
     *
     * @param {AppService} app
     */
    constructor(app) {
        super();

        assert(this.constructor.name !== 'AbstractEndpoint');

        assert(typeof this.method === 'function' && methods.includes(this.method()));
        assert(typeof this.path === 'function' && typeof this.path() === 'string');
        assert(typeof this.action === 'function');

        this.#app = app;
    }
}

module.exports = {
    AbstractEndpoint
};

