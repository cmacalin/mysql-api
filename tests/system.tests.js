const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const test_url = 'http://lccalhost:3000';

describe('QASystem API Service', function(){
    it('should GET all system tasks', function(done) {
        chai
            .request(test_url)
            .get('/api/qasystem')
            .end(function(error, response) {
                expect(response.status).to.be.eql(200);
                expect(response.body).to.be.a('array');
                expect(response.body.length).to.not.be.eql(0);
                done();
            });
    });

    it('should GET a single task', function(done){
        const expected = [
            {
                id: 1,
                name: 'System task 1',
                created_data: '2020-11-20T21:12:05.000Z',
                status: 'completed'
            }
        ];

        chai
            .request(test_url)
            .get('/api/qasystem/1')
            .end(function(error, response) {

            })
    });
})