const supertest = require('supertest')

const server = require('./server')
const db = require('../database/dbConfig')
const { expectCt } = require('helmet')

describe('End point tests', function () {
    describe('POST tests', function () {
        beforeAll(async () => {
            await db('users').truncate()
        })
        it('/register should return status 201', function () {
            return supertest(server)
                .post('/api/auth/register')
                .send({ username: 'test', password: 'test' })
                .then(res => {
                    expect(res.status).toBe(201)
                })
        })
        it('/login should return status 200', function () {
            return supertest(server)
                .post('/api/auth/login')
                .send({ username: 'test', password: 'test' })
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })
        it('/register should return json', function () {
            return supertest(server)
                .post('/api/auth/register')
                .send({ username: 'jsontest', password: 'jsontest' })
                .then(res => {
                    expect(res.type).toMatch(/json/i)
                })
        })
        it('/login should return json', function () {
            return supertest(server)
                .post('/api/auth/login')
                .send({ username: 'jsontest', password: 'jsontest' })
                .then(res => {
                    expect(res.type).toMatch(/json/i)
                })
        })
        it('/login should return welcome on login', function () {
            return supertest(server)
                .post('/api/auth/login')
                .send({ username: 'test', password: 'test' })
                .then(res => {
                    expect(res.body.message).toBe('Welcome')
                })
        })
    })
})