const assert = require('assert');

const {Abstract} = require('./Abstract');

class AbstractService extends Abstract {
    /**
     * Constructor.
     */
    constructor() {
        super();
        assert(this.constructor.name !== 'AbstractService');
    }
}

module.exports = {
    AbstractService
};
