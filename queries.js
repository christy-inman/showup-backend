const database = require('./database-connection')

module.exports = {
    allUsers() {
        return database('users')
    },
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
    },
    deleteProtest(id) {
        return database('protest')
            .where({id})
            .delete()
    },
    updateProtest(id, protest) {
        return database('protests')
            .where({id})
            .update(protest)
    }
}