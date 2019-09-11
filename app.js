const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const port = process.env.PORT || 3000
const queries = require('./queries')
const User = require('./models/user')

const transport = {
    host: 'smtp.gmail.com',
    auth: {
        user: 'christyinman4@gmail.com',
        pass: 'ejwrbqmhgbhgorlc'
    }
}
const transporter = nodemailer.createTransport(transport)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
app.use(cors())
app.use(bodyParser.json())

transporter.verify((error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Server is ready to take messages');
    }
  })

app.post('/send', (request, response) => {
    let {name} = request.body
    let {email} = request.body
    let {message} = request.body
    let content = `name: ${name} \n email: ${email} \n message: ${message} `
    const mail = {
        from: name,
        to: 'showup.speakout@gmail.com',
        subject: 'New Message from Contact Form',
        text: content
    }

    transporter.sendMail(mail, (error, data) => {
        error ? response.json({msg: 'fail'}) : response.json({msg: 'success'})
    })
})

app.post('/signup', User.signup)

app.post('/login', User.login)

app.get('/users', (request, response) => {
    queries.allUsers()
        .then(users => response.send(users))
})

app.get('/', (request, response) => {
    queries.allProtests()
        .then(protests => response.send(protests))
}),
app.get('/:id', (request, response) => {
    queries.getById(request.params.id)
        .then(protest => response.send(protest))
}),
app.post('/', (request, response) => {
    queries.createProtest(request.body)
        .then(protest => response.send(protest))
}),
app.delete('/:id', (request, response) => {
    queries.deleteProtest(request.params.id)
        .then(protest => response.send(protest))
}),
app.put('/:id', (request, response) => {
    queries.updateProtest(request.params.id, request.body)
        .then(protest => response.send(protest))
})

module.exports = app