
exports.up = function(knex) {
  return knex.schema.createTable('protests', (protest) => {
      protest.increments('id')
      protest.string('name')
      protest.text('image')
      protest.date('date')
      protest.time('time')
      protest.string('location')
      protest.text('description')
      protest.text('donate')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('protests')
};
