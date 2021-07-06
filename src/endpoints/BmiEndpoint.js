const {InvalidValueObjectError} = require('../errors/InvalidValueObjectError');
const {WeightValueObject} = require('../valueObjects/WeightValueObject');
const {HeightValueObject} = require('../valueObjects/HeightValueObject');
const {GenderValueObject} = require('../valueObjects/GenderValueObject');
const {BmiModel} = require('../models/BmiModel');
const {makeBmiRepositoryService} = require('../providers/BmiRepositoryServiceProvider');
const {BadRequestHttpError} = require('../errors/BadRequestHttpError');
const {AbstractEndpoint} = require('./AbstractEndpoint');

class BmiEndpoint extends AbstractEndpoint {
    /**
     * @returns {string}
     */
    method() {
        return 'post';
    }

    /**
     * @returns {string}
     */
    path() {
        return '/v1/bmi';
    }

    /**
     * @param req
     * @param resp
     * @returns {{}}
     */
    action(req, resp) {
        if (!Array.isArray(req.body)) {
            throw new BadRequestHttpError('JSON input expected.');
        }

        const body = req.body;

        const bmiRepository = makeBmiRepositoryService();
        for (let i = body.length - 1; i >= 0; i--) {
            const item = body[i];

            let gender;
            let height;
            let weight;
            try {
                gender = new GenderValueObject(item.Gender);
                height = new HeightValueObject(item.HeightCm);
                weight = new WeightValueObject(item.WeightKg);
            } catch (err) {
                if (err instanceof InvalidValueObjectError) {
                    throw new BadRequestHttpError(
                        'Invalid JSON format or value.'
                    );
                }
            }

            const bmi = new BmiModel();
            bmi.height = height;
            bmi.weight = weight;

            const set = bmiRepository.set({
                bmi: bmi.bmi,
                category: bmi.category,
                healthRisk: bmi.healthRisk
            });
            if (!set) {
                throw new BadRequestHttpError('Invalid JSON format or value.');
            }
        }

        return {
            message: 'Added.'
        };
    }
}

module.exports = {
    BmiEndpoint
};
