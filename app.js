const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const queries = require('./queries')

app.listen(port)

app.get('/', (request, response) => {
    queries.allProtests()
        .then(protests => response.send(protests))
})

console.log(`Listening on port ${port}`)