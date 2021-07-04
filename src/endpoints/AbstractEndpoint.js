const assert = require('assert');

const {Abstract} = require('../services/Abstract');

/**
 * @type {string[]}
 */
const methods = ['get'];

class AbstractEndpoint extends Abstract {
    /**
     * Constructor.
     */
    constructor() {
        super();

        assert(this.constructor.name !== 'AbstractEndpoint');

        assert(typeof this.method === 'function' && methods.includes(this.method()));
        assert(typeof this.path === 'function' && typeof this.path() === 'string');
        assert(typeof this.action === 'function');
    }
}

module.exports = {
    AbstractEndpoint
};

