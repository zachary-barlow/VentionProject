
exports.up = function(knex) {
  return knex.schema.createTable('books', table => {
    table.increments('id');
    table.string('title').notNullable();
    table.string('author').notNullable();
    table.string('publisher').notNullable();
    table.string('yearPublished').notNullable();
    table.decimal('price', 4, 2).notNullable();
    table.integer('quantity').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('books');
};
