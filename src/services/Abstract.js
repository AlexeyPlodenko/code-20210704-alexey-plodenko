const assert = require('assert');

class Abstract {
    /**
     * Constructor.
     */
    constructor() {
        assert(this.constructor.name !== 'Abstract');
    }
}

module.exports = {
    Abstract
};
