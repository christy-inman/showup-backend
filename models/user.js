const database = require('../database-connection')
const bcrypt = require('bcrypt')
const crypto = require('crypto')

const hashPassword = (password) => {
    return new Promise((resolve, reject) => 
        bcrypt.hash(password, 10, (error, hash) => {
            error ? reject(error) : resolve(hash)
        })
    )
}

const createToken = () => {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (error, data) => {
            error ? reject(error) : resolve(data.toString('base64'))
        })
    })
}

const createUser = (user) => {
    return database('users').insert(user)
}

const signup = (request, response) => {
    const user = request.body

    hashPassword(user.password)
        .then(hashedPassword => {
            delete user.password
            user.password_digest = hashedPassword
        })
        .then(() => createToken())
        .then(token => user.token = token)
        .then(() => createUser(user))
        .then(user => {
            delete user.password_digest
            response.status(201).json({user})
        })
        .catch(error => console.log(error))
}

module.exports = {
    signup,
    // signin
}