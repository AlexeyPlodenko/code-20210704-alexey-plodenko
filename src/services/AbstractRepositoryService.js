const assert = require('assert');

const {AbstractService} = require('./AbstractService');

class AbstractRepositoryService extends AbstractService {
    /**
     * @type {[]}
     */
    #data = [];

    /**
     * Constructor.
     */
    constructor() {
        super();
        assert(this.constructor.name !== 'AbstractRepositoryService');
    }

    /**
     * @param {*} value
     * @returns {boolean}
     */
    set(value) {
        if (!this.isValid(value)) {
            return false;
        }

        this.#data.push(value);
        return true;
    }

    /**
     * @param {Function} fn
     */
    each(fn) {
        const data = this.#data;
        const size = data.length;
        for (let i = 0; i < size; i++) {
            (fn)(data[i]);
        }
    }
}

module.exports = {
    AbstractRepositoryService
};
