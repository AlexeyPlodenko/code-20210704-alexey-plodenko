const {AbstractHttpError} = require('./AbstractHttpError');

class BadRequestHttpError extends AbstractHttpError {
    /**
     * @param {string} message
     */
    constructor(message) {
        const status = 400;
        super(message, status);
    }
}

module.exports = {
    BadRequestHttpError
};
