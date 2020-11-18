const knex = require('../../db/knex/knex');


module.exports = (req, res, next) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');

  // only if you want anyone to access this endpoint
  res.setHeader('Access-Control-Allow-Origin', '*');

  
  const getData = (outOfStock, ids) => {
    knex.select()
    .from('books')
    .where({quantity: 0})
    .then(books => {
        outOfStock = outOfStock.concat(books.filter(book => !ids.includes(book.id)));
        const sseFormattedResponse = "data: " + `${JSON.stringify(outOfStock)}\n\n`;
        res.write(sseFormattedResponse);
        res.flushHeaders(); 
      }
    ).catch(err => console.log(err));

  }



  Object.assign(res, {getData});
  next();
}