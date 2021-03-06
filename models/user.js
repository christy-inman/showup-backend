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
            response.status(201).json(user)
        })
        .catch(error => console.log(error))
}

const findUser = (user) => {
    return database('users').where({email: user.email}).first()
}

const checkPassword = (requestPassword, foundUser) => {
    return new Promise((resolve, reject) => 
    bcrypt.compare(requestPassword, foundUser.password_digest, 
        (error, response) => {
            if (error) {reject(error)}
            else if (response) {resolve(response)}
            else {reject(new Error('Passwords do not match.'))}
        }))
}

// deleted because only used it once, so coded straight in promise
// const deleteUserToken = (user) => {
//     return database('users')
//         .where({id: user.id})
//         .delete(user.token)
// }

const login = (request, response) => {
    const userRequest = request.body
    let user

    findUser(userRequest)
        .then(foundUser => {
            user = foundUser
            return checkPassword(userRequest.password, foundUser)
        })
        .then(() => createToken())
        .then(token => user.token = token)
        .then(userToken => {response.json(userToken)})
        .catch(error => console.log(error))
}

const findByToken = (token) => {
    return database('users').where({token})
}

const authenticate = (userRequest) => {
    findByToken(userRequest.token)
        .then(user => {
            if (user.email === userRequest.email) {
                return true}
            else {return false}
        })
}

const logout = (request, response) => {
    const userRequest = request.body

    findUser(userRequest)
        .then(user => user.token = '')
        .then(res => response.json(res))
        .catch(error => console.log(error))
}

module.exports = {
    signup,
    login,
    authenticate,
    logout
}