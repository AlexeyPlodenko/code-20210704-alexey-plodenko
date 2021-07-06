const assert = require('assert');

const {Abstract} = require('../services/Abstract');

class AbstractModel extends Abstract {
    /**
     * @type {{}}
     */
    #data = {};

    /**
     * @param {string} key
     * @param {*} value
     * @protected
     */
    setKey(key, value) {
        assert(typeof key === 'string');

        this.#data[key] = value;
    }

    /**
     * @param {string} key
     * @protected
     */
    getKey(key) {
        assert(typeof key === 'string');

        return this.#data[key];
    }
}

module.exports = {
    AbstractModel
};
