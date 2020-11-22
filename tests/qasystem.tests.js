const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

// Current functionality uses current database, NOT a test database
const test_url = 'http://localhost:3000';

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

    it('should GET a single task', function(done) {
        const expected = [
            {
                id: 3,
                name: 'Task 3',
                created_date: '2020-11-21T17:39:30.000Z',
                status: 'created'
            }
        ];

        chai
            .request(test_url)
            .get('/api/qasystem/3')
            .end(function(error, response) {
                expect(response.status).to.be.eql(200);
                expect(response.body).to.be.a('array');
                expect(response.body.length).to.not.be.eql(0);
                expect(response.body).to.be.eql(expected);
                done();
            });
    });

    it.skip('should POST a new system task', function(done) {
       const newSystemTask = {
           name: 'Testing task',
           status: 'created'
       }
       const expected = {message: "System task added"};

       chai
           .request(test_url)
           .post('/api/qasystem')
           .send(newSystemTask)
           .end(function(error, response) {
               expect(response.status).to.be.eql(200);
               expect(response.body).to.be.eql(expected);
               done();
           });
    });
})