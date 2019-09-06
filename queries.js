const database = require('./database-connection')

module.exports = {
    allProtests() {
        return database('protests')
    }
}