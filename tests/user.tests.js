const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTksImlhdCI6MTYwNjAxOTAwMSwiZXhwIjoxNjA2MTA1NDAxfQ.QU9WDz1uG7hwnu-zI0FYnmbXlTjcATbK0R1lqSNuXhs";

const test_url = 'http://localhost:3000';

const existingUser = {
    username: 'testUser',
    email: 'test@example.com',
    first_name: 'TestUpdate',
    last_name: 'User',
    password: 'testpassword7' // last used: 7
};

describe('User API service', () => {
    it("should GET a logged in user's info", (done) => {
        const other_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTksImlhdCI6MTYwNjAyMzgwMiwiZXhwIjoxNjA2MTEwMjAyfQ.gtY_Vvxfn5ZN-zF2dD6lsM6SM9G-UlK2ex14xQLEUVA";
        chai
            .request(test_url)
            .get('/api/user/currentUser')
            .set('Authorization', `Bearer ${other_token}`)
            .end((error, response) => {
                expect(response.body).to.eql(existingUser);
                done();
            });
    });

    // run one time then skip once working
    it.skip('should PUT updated credentials for a logged in user', (done) => {

        const expected = {message: 'User info successfully updated!'};

        chai
            .request(test_url)
            .put('/api/user/currentUser/update')
            .set('Authorization', `Bearer ${token}`)
            .send(existingUser)
            .end((error, response) => {
                expect(response.body).to.eql(expected);
                done();
            });
    });

    it.skip('should not PUT updated credentials for a logged in user if nothing has changed', (done) => {
        const other_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTYwNjAyMzEyOSwiZXhwIjoxNjA2MTA5NTI5fQ.hISdnbtEM3LmhM4fouAPb4r9ACztjrLoxepY0JX9QFI";
        const testConstUser = {
            username: 'testUser2',
            email: 'tes2t@example.com',
            first_name: 'Test2',
            last_name: 'User',
            password: 'testpassword'
        };
        const expected = { message: 'No updated info' };

        chai
            .request(test_url)
            .put('/api/user/currentUser/update')
            .set('Authorization', `Bearer ${other_token}`)
            .send(testConstUser)
            .end((error, response) => {
                expect(response.body).to.eql(expected);
                done();
            });
    });
});