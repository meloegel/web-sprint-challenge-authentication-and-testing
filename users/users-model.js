const db = require('../database/dbConfig')

module.exports = {
    add,
    login
}

function add(user) {
    return db('users')
        .insert(user)
}

function login(filter) {
    return db('users')
        .where(filter)
        .orderBy('id')
}