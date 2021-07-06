const {AbstractValueObject} = require('./AbstractValueObject');

const genders = [ 'Male', 'Female' ];

class GenderValueObject extends AbstractValueObject {
    /**
     * @param {*} value
     * @returns {boolean}
     */
    isValid(value) {
        return genders.includes(value);
    }
}

module.exports = {
    GenderValueObject
};
