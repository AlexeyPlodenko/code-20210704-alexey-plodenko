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
        return '/v1/bmi/category/total';
    }

    /**
     * @param req
     * @param resp
     * @returns {{}}
     */
    action(req, resp) {
        const bmiRepository = makeBmiRepositoryService();

        let overweightCount = 0;
        bmiRepository.each((item) => {
            if (item.category === 'Overweight') {
                overweightCount++;
            }
        });

        return {
            overweightCount
        };
    }
}

module.exports = {
    BmiCategoryTotalEndpoint
};
