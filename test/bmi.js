const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../src/index');
const should = chai.should();

chai.use(chaiHttp);

const api = 'http://localhost:3000';

describe('BMI', () => {
    describe('POST /v1/bmi', () => {
        it('it should POST BMI', (done) => {
            const data = [
                {"Gender": "Male", "HeightCm": 171, "WeightKg": 96},
                {"Gender": "Male", "HeightCm": 161, "WeightKg": 85},
                {"Gender": "Male", "HeightCm": 180, "WeightKg": 77},
                {"Gender": "Female", "HeightCm": 166, "WeightKg": 62},
                {"Gender": "Female", "HeightCm": 150, "WeightKg": 70},
                {"Gender": "Female", "HeightCm": 167, "WeightKg": 82}
            ];
            chai.request(api)
                .post('/v1/bmi')
                .send(data)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('data');
                    res.body.data.should.have.property('message').eql('Added.');
                    done();
                });
        });

        it('it should not POST BMI with fake gender', (done) => {
            const data = [
                {"Gender": "Someone", "HeightCm": 171, "WeightKg": 96},
            ];
            chai.request(api)
                .post('/v1/bmi')
                .send(data)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('it should not POST BMI with negative height', (done) => {
            const data = [
                {"Gender": "Male", "HeightCm": -171, "WeightKg": 96},
            ];
            chai.request(api)
                .post('/v1/bmi')
                .send(data)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('it should not POST BMI with negative weight', (done) => {
            const data = [
                {"Gender": "Male", "HeightCm": -171, "WeightKg": -96},
            ];
            chai.request(api)
                .post('/v1/bmi')
                .send(data)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe('GET /v1/bmi/category/Overweight/total', () => {
        it('it should GET total overweight count', (done) => {
            chai.request(api)
                .get('/v1/bmi/category/Overweight/total')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('data');
                    res.body.data.should.have.property('count').eql(1);
                    done();
                });
        });
    });

    describe('GET /v1/bmi/category/random/total', () => {
        it('it should not GET total random count', (done) => {
            chai.request(api)
                .get('/v1/bmi/category/random/total')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('data');
                    res.body.data.should.have.property('count').eql(0);
                    done();
                });
        });
    });
});
