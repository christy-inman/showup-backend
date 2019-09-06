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
})

console.log(`Listening on port ${port}`)