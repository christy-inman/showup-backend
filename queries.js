const database = require('./database-connection')

module.exports = {
    allProtests() {
        return database('protests')
    },
    getById(id) {
        return database('protests')
            .where({id})
            .first()
    },
    createProtest(protest) {
        return database('protests')
            .insert(protest)
    }
}