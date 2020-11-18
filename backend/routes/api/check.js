const knex = require('../../db/knex/knex');

async function run(req, res) {
  let books = [];
  // get all data from database where quantity == 0
  knex.from('books')
      .select()
      .where({quantity: 0})
      .then(books => 
        console.log(books)  
      );

  return books;
}