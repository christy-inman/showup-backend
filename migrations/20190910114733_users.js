
exports.up = function(knex) {
  return knex.schema.createTable('users', (user) => {
      user.increments('id')
      user.string('name')
      user.string('email')
      user.string('password_digest')
      user.string('token')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
};
