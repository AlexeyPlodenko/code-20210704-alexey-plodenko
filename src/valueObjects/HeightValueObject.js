const {AbstractValueObject} = require('./AbstractValueObject');

class HeightValueObject extends AbstractValueObject {
    /**
     * @param {*} value
     * @returns {boolean}
     */
    isValid(value) {
        return typeof value === 'number' && value > 0 && value < 300;
    }
}

module.exports = {
    HeightValueObject
};
