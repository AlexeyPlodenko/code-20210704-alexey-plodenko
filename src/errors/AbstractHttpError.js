const assert = require('assert');

class AbstractHttpError extends Error {
    /**
     * @type {number}
     */
    #status;

    /**
     * @param {string} message
     * @param {number} status
     */
    constructor(message, status) {
        super(message);
        assert(this.constructor.name !== 'AbstractHttpError');
        assert(typeof status === 'number');

        this.#status = status;
    }

    /**
     * @returns {number}
     */
    getStatus() {
        return this.#status;
    }
}

module.exports = {
    AbstractHttpError
};
