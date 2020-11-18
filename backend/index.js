//const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

const books = require('./routes/api/books.js');
const login = require('./routes/api/login.js');

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

/* routes */
app.use('/login', login);
app.use('/api', books);

// error handling
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

// error handler middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || 'Internal Server Error',
    },
  });
});

app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));