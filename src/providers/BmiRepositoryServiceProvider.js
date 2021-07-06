const {BmiRepositoryService} = require('../services/BmiRepositoryService');

/**
 * @type {BmiRepositoryService}
 */
let instance;

/**
 * @returns {BmiRepositoryService}
 */
function makeBmiRepositoryService() {
    if (!instance) {
        instance = new BmiRepositoryService();
    }

    return instance;
}

module.exports = {
    makeBmiRepositoryService
};
