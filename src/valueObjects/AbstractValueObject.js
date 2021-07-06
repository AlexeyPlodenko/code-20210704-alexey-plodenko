const assert = require('assert');

const {InvalidValueObjectError} = require('../errors/InvalidValueObjectError');
const {Abstract} = require('../services/Abstract');

class AbstractValueObject extends Abstract {
    /**
     * @type {*}
     */
    #value;

    /**
     * Constructor.
     *
     * @param {*} value
     */
    constructor(value = undefined) {
        super();
        assert(this.constructor.name !== 'AbstractValueObject');
        assert(
            typeof this.isValid === 'function',
            'Need to implement the isValid() method.'
        );

        if (value !== undefined) {
            this.setValue(value);
        }
    }

    /**
     * @param {*} value
     */
    setValue(value) {
        if (!this.isValid(value)) {
            throw new InvalidValueObjectError();
        }

        this.#value = value;
    }

    /**
     * @returns {*}
     */
    getValue() {
        return this.#value;
    }
}

module.exports = {
    AbstractValueObject
};
