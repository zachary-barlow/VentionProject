//const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// const bcrypt = require('bcrypt');
// const saltRounds = 10;

dotenv.config();

const express = require('express');
const app = express();

// const routes = require('./routes/api/routes');

// app.use(routes);

// SOCKET IO
// const server = http.createServer(app);
// const io = require('socket.io')(server);

const PORT = process.env.PORT || 5000;

const verify = require('./routes/api/auth');
const inv = require('./routes/api/controller.js');
const check = require('./routes/api/source.js');

app.use(cors());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

/* ------------------------------------------------------------------------------ */
/*                                  GET REQUESTS                                  */
/* ------------------------------------------------------------------------------ */

app.get('/api/books', verify, (req, res) => {
  console.log(`Request method: ${req.method} Endpoint: ${req.url}`);
  inv.getBooks(req,res);
});


app.get('/api/books/:title', verify, (req, res) => {
  console.log(`Request method: ${req.method} Endpoint: ${req.url}`);
  inv.getBook(res, req.params.title); // get the individual book back
});


app.get('/api/check', check, (req, res) => {
  console.log(`Request method: ${req.method} Endpoint: ${req.url}`);
  inv.check(req,res); // get the individual book back
});


/* ------------------------------------------------------------------------------ */
/*                                  POST REQUESTS                                 */
/* ------------------------------------------------------------------------------ */
app.post('/api/books/create', verify, (req, res) => {
  console.log(`Request method: ${req.method} Endpoint: ${req.url}`);
  inv.createBook(req, res);
});

app.post('/login', (req, res) => {
  console.log(`Request method: ${req.method} Endpoint: ${req.url}`);
  inv.login(req, res);
});

/* ------------------------------------------------------------------------------ */
/*                                  PUT REQUESTS                                  */
/* ------------------------------------------------------------------------------ */
app.put('/api/books/update', verify, (req, res) => {
  console.log(`Request method: ${req.method} Endpoint: ${req.url}`);
  inv.updateBook(req, res);
});

app.put('/api/books/quantity', verify, (req, res) => {
  console.log(`Request method: ${req.method} Endpoint: ${req.url}`);
  inv.updateQuantity(req, res);
});

/* ------------------------------------------------------------------------------ */
/*                               DELETE REQUESTS                                  */
/* ------------------------------------------------------------------------------ */
app.delete('/api/books/delete/:id', verify, (req, res) => {
  console.log(`Request method: ${req.method} Endpoint: ${req.url}`);
  inv.deleteBook(res, req.params.id);
});


/* ------------------------------------------------------------------------------ */
/*                               SOCKET IO REQUESTS                               */
/* ------------------------------------------------------------------------------ */
// io.on('connection', (socket) => {
//   console.log('connect');
//   socket.on('check', (token) => {
//     console.log('checked');
//     if(token != null) {
//       (async () => {
//         let OOS = await inv.check();
//         io.emit('quantity', {stock: OOS});
//       })().catch(err => {
//         console.log(err);
//       });
//     }
//   });

//   socket.on('disconnect', () => {
//     console.log('disconnect');
//   });
// });


app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));