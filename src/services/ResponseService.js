const assert = require('assert');

const {AbstractService} = require('./AbstractService');

class ResponseService extends AbstractService {
    /**
     * @type {{import("express/lib/express").response}}
     */
    #response;

    /**
     * @param {import("express/lib/express").response} response
     */
    constructor(response) {
        super();
        assert(typeof response === 'object');

        this.#response = response;
    }

    /**
     * @param {import("express/lib/express").response} response
     */
    static make(response) {
        return new ResponseService(response);
    }

    /**
     * @param {{}} data
     * @param {number} [status = 200]
     */
    send(data, status = 200) {
        if (typeof data !== 'object') dump(data);
        assert(typeof data === 'object');
        assert(typeof status === 'number');

        this.#response.status(status).send({
            ok: status === 200,
            status: status,
            data: data
        });
    }

    /**
     * @param {*} msg
     * @param {number} status
     */
    sendError(msg, status) {
        assert(typeof msg === 'string');
        assert(typeof status === 'number');

        this.send({ error: msg }, status);
    }
}

module.exports =  {
    ResponseService
};
