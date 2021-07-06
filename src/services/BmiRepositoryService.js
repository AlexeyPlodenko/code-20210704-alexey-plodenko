const {AbstractRepositoryService} = require('./AbstractRepositoryService');

class BmiRepositoryService extends AbstractRepositoryService {
    /**
     * @param {{bmi: number, category: string, healthRisk: string}} value
     * @returns {boolean}
     */
    isValid(value) {
        if (typeof value !== 'object') {
            return false;
        }

        // check of types
        if (
               typeof value.bmi !== 'number'
            || typeof value.category !== 'string'
            || typeof value.healthRisk !== 'string'
        ) {
            return false;
        }

        // check for redundancy
        const expectedProps = ['bmi', 'category', 'healthRisk'];
        for (const key in value) {
            if (value.hasOwnProperty(key) && !expectedProps.includes(key)) {
                return false;
            }
        }

        return true;
    }
}

module.exports = {
    BmiRepositoryService
};
