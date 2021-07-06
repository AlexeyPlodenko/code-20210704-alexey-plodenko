const {BadRequestHttpError} = require('../errors/BadRequestHttpError');
const {makeBmiRepositoryService} = require('../providers/BmiRepositoryServiceProvider');
const {AbstractEndpoint} = require('./AbstractEndpoint');

class BmiCategoryTotalEndpoint extends AbstractEndpoint {
    /**
     * @returns {string}
     */
    method() {
        return 'get';
    }

    /**
     * @returns {string}
     */
    path() {
        return '/v1/bmi/category/:category/total';
    }

    /**
     * @param req
     * @param resp
     * @returns {{}}
     */
    action(req, resp) {
        if (typeof req.params.category !== 'string') {
            throw new BadRequestHttpError('Missing category.');
        }

        const category = req.params.category;

        const bmiRepository = makeBmiRepositoryService();
        let count = 0;
        bmiRepository.each((item) => {
            if (item.category === category) {
                count++;
            }
        });

        return {
            count
        };
    }
}

module.exports = {
    BmiCategoryTotalEndpoint
};
