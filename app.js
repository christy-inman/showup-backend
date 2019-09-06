const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
const bodyParser = require('body-parser')
const queries = require('./queries')

app.listen(port)
app.use(cors())
app.use(bodyParser.json())

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
        .then(response.status(201))
}),
app.delete('/:id', (request, response) => {
    queries.deleteProtest(request.params.id)
        .then(response.status(204))
})

console.log(`Listening on port ${port}`)