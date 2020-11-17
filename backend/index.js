const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
const verify = require('./routes/api/auth');

dotenv.config();

const express = require('express');
const app = express();

const port = process.env.PORT || 5000;

app.use(cors());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

const inv = require('./routes/api/controller.js');
const { checkOptionalTime } = require('tarn/dist/utils');

/* ------------------------------------------------------------------------------ */
/*                                  GET REQUESTS                                  */
/* ------------------------------------------------------------------------------ */

app.get('/api/books', verify, function(req, res) {
  console.log(`Request method: ${req.method} Endpoint: ${req.url}`);
  inv.getBooks(req,res);
});


app.get('/api/books/:title', verify, (req, res) => {
  console.log(`Request method: ${req.method} Endpoint: ${req.url}`);
  inv.getBook(res, req.params.title); // get the individual book back
});


app.get('/api/check', verify, (req, res) => {
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


app.listen(port, function() {
  console.log("listening on port: ", port);
})


// module.exports = http.createServer((req, res) => {

//   if (['GET', 'POST', 'PUT', 'DELETE'].indexOf(req.method) > -1) {
//     if(req.method === "GET") {
//       // check whether requested an single book
//       if (req.url.match(/\/api\/books\/([a-zA-Z]+)/)) {
//         console.log(`Request method: ${req.method} Endpoint: ${req.url}`);
  
//         const title = req.url.split('/')[3];
//         inv.getBook(res, title); // get the individual book back
        
//         // the path to get all the books in the inventory
//       } else if(reqUrl.pathname === '/api/books') {
//         console.log(`Request method: ${req.method} Endpoint: ${req.url}`);
//         inv.getBooks(req, res);
//       } else {
//         console.log('err:  invalid get request');
//       }
//     } else if (req.method === "POST") {
  
//       // add a new book to the inventory system
//       if (reqUrl.pathname === '/api/books/create') {
//         console.log(`Request method: ${req.method} Endpoint: ${req.url}`);
//         inv.createBook(req, res);
//       }
//     } else if (req.method === "PUT") {
  
//       // update a specific book
//       if (reqUrl.pathname === '/api/books/update') {
//         console.log(`Request method: ${req.method} Endpoint: ${req.url}`);
//       }
//     } else if (req.method === "DELETE") {
//       console.log(`Request method: ${req.method} Endpoint: ${req.url}`);
//     } else {
//       console.log('err');
//     }
//   }

//   res.writeHead(405, headers);
//   res.end(`${req.method} is not allowed for the request.`);
// });