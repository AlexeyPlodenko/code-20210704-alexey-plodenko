const {AbstractEndpoint} = require('./AbstractEndpoint');

class HomeEndpoint extends AbstractEndpoint {
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
        return '/';
    }

    /**
     * @returns {string}
     */
    action(req, resp) {
        resp.send('Hello World');
    }
}

module.exports = {
    HomeEndpoint
};
