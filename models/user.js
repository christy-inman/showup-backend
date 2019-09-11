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

const findUser = (userRequest) => {
    return database('users').where(username = userRequest.username)
}

const checkPassword = (requestPassword) => {
    return new Promise((resolve, reject) => 
    bcrypt.compare(requestPassword, foundUser.password_digest, 
        (error, response) => {
            if (error) {reject(error)}
            else if (response) {resolve(response)}
            else {reject(new Error('Passwords do not match.'))}
        }))
}

const updateUserToken = (token, user) => {
    return database('users')
        .where(id === user.id)
        .update(user.token = token)
}

const login = (request, response) => {
    const userRequest = request.body
    let user

    findUser(userRequest)
        .then(foundUser => {
            user = foundUser
            return checkPassword(userRequest, foundUser)
        })
        .then(() => createToken())
        .then(token => updateUserToken(token, user))
}

module.exports = {
    signup,
    login
}