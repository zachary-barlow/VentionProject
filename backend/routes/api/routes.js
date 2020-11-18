const express = require('express');
const router = express.Router();
const verify = require('./auth');
const inv = require('./controller.js');
/* ------------------------------------------------------------------------------ */
/*                                  GET REQUESTS                                  */
/* ------------------------------------------------------------------------------ */

router.get('/api/books', (req, res) => {
  console.log(`Request method: ${req.method} Endpoint: ${req.url}`);
  inv.getBooks(req,res);
});


router.get('/api/books/:title', verify, (req, res) => {
  console.log(`Request method: ${req.method} Endpoint: ${req.url}`);
  inv.getBook(res, req.params.title); // get the individual book back
});


router.get('/api/check', verify, (req, res) => {
  console.log(`Request method: ${req.method} Endpoint: ${req.url}`);
  inv.check(req,res); // get the individual book back
});


/* ------------------------------------------------------------------------------ */
/*                                  POST REQUESTS                                 */
/* ------------------------------------------------------------------------------ */
router.post('/api/books/create', verify, (req, res) => {
  console.log(`Request method: ${req.method} Endpoint: ${req.url}`);
  inv.createBook(req, res);
});

router.post('/login', (req, res) => {
  console.log(req.url);
  console.log(`Request method: ${req.method} Endpoint: ${req.url}`);
  inv.login(req, res);
});

/* ------------------------------------------------------------------------------ */
/*                                  PUT REQUESTS                                  */
/* ------------------------------------------------------------------------------ */
router.put('/api/books/update', verify, (req, res) => {
  console.log(`Request method: ${req.method} Endpoint: ${req.url}`);
  inv.updateBook(req, res);
});

router.put('/api/books/quantity', verify, (req, res) => {
  console.log(`Request method: ${req.method} Endpoint: ${req.url}`);
  inv.updateQuantity(req, res);
});

/* ------------------------------------------------------------------------------ */
/*                               DELETE REQUESTS                                  */
/* ------------------------------------------------------------------------------ */
router.delete('/api/books/delete/:id', verify, (req, res) => {
  console.log(`Request method: ${req.method} Endpoint: ${req.url}`);
  inv.deleteBook(res, req.params.id);
});


module.exports = router;