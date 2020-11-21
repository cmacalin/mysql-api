const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const test_url = 'http://localhost:3000';

describe('Auth API service', () => {
    // run one time then skip once working
    it.skip('should POST a new user', (done) => {
        const expected = {msg: 'User successfully created!'};

        const testUser = {
            username: 'testUser',
            email: 'test@example.com',
            first_name: 'Test',
            last_name: 'User',
            password: 'testpassword'
        };

        chai
            .request(test_url)
            .post('/api/auth/register')
            .send(testUser)
            .end((error, response) => {
                console.log(response.body);
                expect(response.body).to.eql(expected);
                done();
            });
    });

    it('should not POST a new user if they already exist', (done) => {
        const expected = {msg: 'Registration could not be completed. Please try again later.'};

        const existingUser = {
            username: 'user1',
            email: 'user1@cam.com',
            first_name: 'Car',
            last_name: 'Mel',
            password: 'aaaaaa'
        };

        chai
            .request(test_url)
            .post('/api/auth/register')
            .send(existingUser)
            .end((error, response) => {
                expect(response.status).to.eql(500);
                expect(response.body).to.eql(expected);
                done();
            });
    });

    it('should POST a login for an existing', (done) => {
        const testLoginUser = {
            username: 'user1',
            password: 'aaaaaa'
        }
        chai
            .request(test_url)
            .post('/api/auth/login')
            .send(testLoginUser)
            .end((error, response) => {
                //expect(response.body.expires_in).to.be.eql(86400);
                //expect(response.body.access_token).to.be.a('string');
                //expect(response.body.refresh_token).to.be.a('string');
                expect(response.status).to.eql(200);
                expect(response.body.auth).to.be.true;

                done();
            });
    });
});