const knex = require('../../db/knex/knex');
const jwt = require('jsonwebtoken');
const cron = require('node-cron');

exports.getBooks = (req, res) => {
  knex.select().from('books').then(books => {
    let response = [
      {
        "message": "List of books in store",
      },
      books
    ];

    res.send(JSON.stringify(response));
  }).catch(err => console.log(err));
}

exports.getBook = (res, title) => {
  knex.select()
  .from('books')
  .where('title', 'like', `%${title}%`).then(books => {
    res.send(JSON.stringify(books));
  }).catch(err => console.log(err));
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
        }).catch(err => console.log(err));
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
        }).catch(err => console.log(err));
  }).catch(err => console.log(err));
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
        }).catch(err => console.log(err));
  }).catch(err => console.log(err));
}



exports.login = (req, res) => {
  knex.from('users')
      .select()
      .where({username: req.body.username, password: req.body.password})
      .then(user => {
        if(user.length === 1) {
          const token = jwt.sign({user: user}, process.env.SECRET_TOKEN_KEY);
          res.header('token', token).send(token);
        } else {
          return res.status(403).json({
            status: 'error',
            error: 'User does not exist'
          });
        }
      }).catch(err => {
        console.log(err);
      });
}



exports.check = (req, res) => {
  try {
    let outOfStock = [];
    let task = cron.schedule('* * * * *', () => {
      console.log('running a task every minute. ');
      
      let ids = outOfStock.reduce((a, o) => (a.push(o.id), a), []);
      res.getData(outOfStock, ids);
    });

    task.start();

    res.on('close', () => {
      console.log('Connection closed');
      task.destroy();
      res.end();
    });
  }catch(err) {
    return res.status(400).json({
      status: 'error',
      error: 'invalid check'
    });
  }
}