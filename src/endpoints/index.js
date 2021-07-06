const {BmiCategoryTotalEndpoint} = require('./BmiCategoryTotalEndpoint');
const {BmiEndpoint} = require('./BmiEndpoint');
const {HomeEndpoint} = require('./HomeEndpoint');

const endpoints = [
    HomeEndpoint,
    BmiEndpoint,
    BmiCategoryTotalEndpoint
];

module.exports = {
    endpoints
};
