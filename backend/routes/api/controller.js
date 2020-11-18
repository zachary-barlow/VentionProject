const knex = require('../../db/knex/knex');
const jwt = require('jsonwebtoken');
const cron = require('node-cron');

const check = require('./check.js');

exports.getBooks = (req, res) => {
  knex.select().from('books').then(books => {
    let response = [
      {
        "message": "List of books in store",
      },
      books
    ];

    res.send(response);
  }).catch(err => console.log(err));
}

exports.getBook = (res, title) => {
  knex.select()
  .from('books')
  .where('title', 'like', `%${title}%`).then(books => {

    res.send(JSON.stringify(books));
  });
}

exports.createBook = (req, res) => {
  knex('books').insert({ 
    title: req.body.title, 
    author: req.body.author, 
    publisher: req.body.publisher, 
    yearPublished: req.body.yearPublished, 
    price: req.body.price, 
    quantity: 1
  }).then(() => {
    knex.select()
        .from('books')
        .then(books => {
          let response = [
            {
              "message": "List of books in store",
            },
            books
          ];
      
          res.send(JSON.stringify(response));
        });
  });
}


exports.updateBook = (req, res) => {
  knex('books').where({id: req.body.id})
  .update({
    title: req.body.title, 
    author: req.body.author, 
    publisher: req.body.publisher, 
    yearPublished: req.body.yearPublished, 
    price: req.body.price, 
    quantity: req.body.quantity
  })
  .then(() => {
    knex.select()
        .from('books')
        .then(books => {
          let response = [
            {
              "message": "List of books in store",
            },
            books
          ];
    
          res.send(JSON.stringify(response));
        });
  });
}


exports.updateQuantity = (req, res) => {
  knex('books').where({id: req.body.id})
  .update({quantity: req.body.quantity})
  .then(() => {
    knex.select()
        .from('books')
        .then(books => {
          let response = [
            {
              "message": "List of books in store",
            },
            books
          ];
    
          res.send(JSON.stringify(response));
        });
  });
}


exports.deleteBook = (res, id) => {
  knex('books').where({id: id})
  .del()
  .then(() => {
    knex.select()
        .from('books')
        .then(books => {
          let response = [
            {
              "message": "List of books in store",
            },
            books
          ];
    
          res.send(JSON.stringify(response));
        });
  })
}



exports.login = (req, res) => {
  knex.from('users')
      .select()
      .where({username: req.body.username, password: req.body.password})
      .then(user => {
        if(user.length === 1) {
          const token = jwt.sign({user: user}, process.env.SECRET_TOKEN_KEY);
          res.header('token', token);
          res.send(JSON.stringify({token:token}));
        } else {
          res.sendStatus(403);
        }
      }).catch(err => {
        console.log(err);
      })
}



exports.check = () => {
  let outOfStock = [];
  cron.schedule('* * * * *', () => {
    console.log('running a task every minute. ');

    let ids = outOfStock.reduce((a, o) => (a.push(o.id), a), []);
      // get all data from database where quantity == 0
    knex.from('books')
        .select()
        .where({quantity: 0})
        .then(books => {
          outOfStock = outOfStock.concat(books.filter(book => !ids.includes(book.id)));
          return outOfStock;
        }
    );
  });
}