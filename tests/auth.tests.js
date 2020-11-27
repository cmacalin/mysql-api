const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const test_url = 'http://localhost:3000';

describe('Auth API service', () => {
    // run one time then skip once working
    it.skip('should POST a new user', (done) => {
        const expected = {message: 'User successfully created!'};
        // Last used: 5
        const testUser = {
            username: 'testUser5',
            email: 'test5@example.com',
            first_name: 'Test5',
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

    it('should POST a login for an existing account', (done) => {
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
        const expected = {message: "Some information is missing. Please try again."};
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