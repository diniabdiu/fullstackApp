const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('notes are returned in json', () => {
    await api.get('/api/notes').expect(200).expect('Content-Type', /aplication\/json/)
})

afterAll(() => {
    mongoose.connection.close()
})