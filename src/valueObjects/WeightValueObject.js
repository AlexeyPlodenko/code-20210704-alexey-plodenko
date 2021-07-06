const {AbstractValueObject} = require('./AbstractValueObject');

class WeightValueObject extends AbstractValueObject {
    /**
     * @param {*} value
     * @returns {boolean}
     */
    isValid(value) {
        return typeof value === 'number' && value > 0 && value < 500;
    }
}

module.exports = {
    WeightValueObject
};
