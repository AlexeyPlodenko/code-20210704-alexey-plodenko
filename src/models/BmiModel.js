const assert = require('assert');

const {HeightValueObject} = require('../valueObjects/HeightValueObject');
const {WeightValueObject} = require('../valueObjects/WeightValueObject');
const {AbstractModel} = require('./AbstractModel');

class BmiModel extends AbstractModel {
    /**
     * @param {WeightValueObject} value
     */
    set weight(value) {
        assert(
               typeof value === 'object'
            && value instanceof WeightValueObject
            && value.getValue()
        );

        this.setKey('weight', value);
    }

    /**
     * @param {HeightValueObject} value
     */
    set height(value) {
        assert(
               typeof value === 'object'
            && value instanceof HeightValueObject
            && value.getValue()
        );

        this.setKey('height', value);
    }

    /**
     * @returns {number}
     */
    get bmi() {
        let bmi = this.getKey('bmi');
        if (!bmi) {
            bmi = this.calculateBmi();
            this.setKey('bmi', bmi);
        }

        return bmi;
    }

    /**
     * @returns {string}
     */
    get category() {
        const bmi = this.bmi;

        if (bmi < 18.5) {
            return 'Underweight';
        } else if (bmi >= 18.5 && bmi < 25) {
            return 'Normal weight';
        } else if (bmi >= 25 && bmi < 30) {
            return 'Overweight';
        } else if (bmi >= 30 && bmi < 35) {
            return 'Moderately obese';
        } else if (bmi >= 35 && bmi < 40) {
            return 'Severely obese';
        } else {
            return 'Very severely obese';
        }
    }

    /**
     * @returns {string}
     */
    get healthRisk() {
        const bmi = this.bmi;

        if (bmi < 18.5) {
            return 'Malnutrition risk';
        } else if (bmi >= 18.5 && bmi < 25) {
            return 'Low risk';
        } else if (bmi >= 25 && bmi < 30) {
            return 'Enhanced risk';
        } else if (bmi >= 30 && bmi < 35) {
            return 'Medium risk';
        } else if (bmi >= 35 && bmi < 40) {
            return 'High risk';
        } else {
            return 'Very high risk';
        }
    }

    /**
     * @returns {number}
     */
    calculateBmi() {
        /** @type WeightValueObject */
        const weight = this.getKey('weight');
        if (!weight) {
            throw new Error('Weight is not set.');
        }
        const weightKg = weight.getValue();

        /** @type HeightValueObject */
        const height = this.getKey('height');
        if (!height) {
            throw new Error('Height is not set.');
        }
        const heightMeters = height.getValue() / 100;

        return weightKg / (heightMeters ** 2);
    }
}

module.exports = {
    BmiModel
};
