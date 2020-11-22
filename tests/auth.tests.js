const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const test_url = 'http://localhost:3000';

describe('Auth API service', () => {
    // run one time then skip once working
    it.skip('should POST a new user', (done) => {
        const expected = {message: 'User successfully created!'};

        const testUser = {
            username: 'testUser2',
            email: 'tes2t@example.com',
            first_name: 'Test2',
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
        const expected = {message: 'User already exists. Please log in.'};

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
                expect(response.status).to.eql(403);
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
                expect(response.status).to.eql(200);
                expect(response.body.auth).to.be.true;

                done();
            });
    });

    it('should not POST new user if information is missing', (done) => {
        const testUser = {
            username: 'testUser',
            email: 'test@example.com',
            first_name: 'Test',
            last_name: 'User'
        };
        const expected = {msg: "Some information is missing. Please try again."};
        chai
            .request(test_url)
            .post('/api/auth/register')
            .send(testUser)
            .end((error, response) => {
                expect(response.status).to.eql(500);
                expect(response.body).to.eql(expected);
                done();
            });
    });
});