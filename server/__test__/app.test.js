
const request = require('supertest')
const app = require('../app')


const createUUser = {

    username: 'testing',
    email: 'testing@x.com _',
    password: ''

}




describe('testing user Login and sing up', () => {

    test('test sing up', async () => {
        await request(app).post('/api/user/create/')
            .send(createUUser).expect(404)

    })

})