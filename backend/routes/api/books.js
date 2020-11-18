const express = require('express');
const router = express.Router();


const verify = require('../auth/auth');
const inv = require('../controller/controller.js');
const check = require('../controller/source.js');


/* ------------------------------------------------------------------------------ */
/*                                  GET REQUESTS                                  */
/* ------------------------------------------------------------------------------ */
router.get('/books', verify, (req, res) => {
  console.log(`Request method: ${req.method} Endpoint: /api${req.url}`);
  inv.getBooks(req,res);
});

router.get('/books/:title', verify, (req, res) => {
  console.log(`Request method: ${req.method} Endpoint: /api${req.url}`);
  inv.getBook(res, req.params.title); // get the individual book back
});

router.get('/check', check, (req, res) => {
  console.log(`Request method: ${req.method} Endpoint: /api${req.url}`);
  inv.check(req,res); // get the individual book back
});


/* ------------------------------------------------------------------------------ */
/*                                  POST REQUESTS                                 */
/* ------------------------------------------------------------------------------ */
router.post('/books/create', verify, (req, res) => {
  console.log(`Request method: ${req.method} Endpoint: /api${req.url}`);
  inv.createBook(req, res);
});


/* ------------------------------------------------------------------------------ */
/*                                  PUT REQUESTS                                  */
/* ------------------------------------------------------------------------------ */
router.put('/books/update', verify, (req, res) => {
  console.log(`Request method: ${req.method} Endpoint: /api${req.url}`);
  inv.updateBook(req, res);
});

router.put('/books/quantity', verify, (req, res) => {
  console.log(`Request method: ${req.method} Endpoint: /api${req.url}`);
  inv.updateQuantity(req, res);
});


/* ------------------------------------------------------------------------------ */
/*                               DELETE REQUESTS                                  */
/* ------------------------------------------------------------------------------ */
router.delete('/books/delete/:id', verify, (req, res) => {
  console.log(`Request method: ${req.method} Endpoint: /api${req.url}`);
  inv.deleteBook(res, req.params.id);
});



module.exports = router;