const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

// Update token every time server is restarted
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjA2NDU0MzQ1LCJleHAiOjE2MDY1NDA3NDV9.cUIoVfPUnQB1jrQX0Bwq4Aysua-iplZrtR4u8BjhuIo";

// Current functionality uses current database, NOT a test database
const test_url = 'http://localhost:3000';

describe('QASystem API Service', function(){
    it.skip('should GET all system tasks', function(done) {
        chai
            .request(test_url)
            .get('/api/qasystem')
            .set('Authorization', `Bearer ${token}`)
            .end(function(error, response) {
                expect(response.status).to.be.eql(200);
                expect(response.body).to.be.a('array');
                expect(response.body.length).to.not.be.eql(0);
                done();
            });
    });

    it.skip('should GET a single task', function(done) {
        const expected = [
            {
                system_task_id: 1,
                user_id: 2,
                name: 'Testing task',
                created_date: '2020-11-27T05:33:45.000Z',
                status: 'created'
            }
        ];

        chai
            .request(test_url)
            .get('/api/qasystem/1')
            .set('Authorization', `Bearer ${token}`)
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
           .set('Authorization', `Bearer ${token}`)
           .send(newSystemTask)
           .end(function(error, response) {
               expect(response.status).to.be.eql(200);
               expect(response.body).to.be.eql(expected);
               done();
           });
    });
})