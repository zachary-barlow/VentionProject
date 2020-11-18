import React, {useEffect, useState} from 'react';

import Book from './Book';
import Alert from './Alert';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Button, Form, FormControl} from 'react-bootstrap';

import FormModal from './Modal';


function Inventory({url}) {
  const [show, setShow] = useState(false);
  const [books, setBooks] = useState([]);
  const [stock, setStock] = useState([
    {
      id: 1, 
      title: 'Book 1', 
      author: 'Some Guy', 
      publisher: 'publisher', 
      yearPublished: '2018', 
      price: 42.24, 
      quantity: 3
    }]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    allBooks();
    return () => {
      localStorage.clear();
    }
  }, []);

  useEffect(() => {
    const events = new EventSource('http://localhost:5000/api/check');

    events.onopen = function() {
      console.log("opened");
    }

    events.onmessage = function(event){
      setStock(JSON.parse(event.data));
    };
  }, []);

  const allBooks = () => {
    fetch("http://localhost:5000/api/books", {
      method: 'GET',
      headers: {
        // "Access-Control-Allow-Origin": "*",
        'token': localStorage.getItem('token')
      }
    })
    .then(res => res.json())
    .then(data => {
      setBooks(data[1]);
    }).catch(err => {
      console.log("Error: " + err);
    });
  }





  const formSubmit = (e, data) => {
    e.preventDefault();
    
    fetch("http://localhost:5000/api/books/update", {
      method: 'PUT',
      headers: {
        'token': localStorage.getItem('token'),
        'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
       },
       body: JSON.stringify(data) // We send data in JSON format
    })
    .then(res => res.json())
    .then(dat => {
      setBooks(dat[1]);
    }).catch(err => {
      console.log("Error: " + err);
    });
  }

  const handleSubmit = (e, data) => {
    e.preventDefault();
    fetch("http://localhost:5000/api/books/create", {
      method: 'POST',
      headers: {
        'token': localStorage.getItem('token'),
        'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
       },
       body: JSON.stringify(data) // We send data in JSON format
    })
    .then(res => res.json())
    .then(dat => {
      handleClose();
      setBooks(dat[1]);
    }).catch(err => {
      console.log("Error: " + err);
    });
  }

  const updateQuantity = (info, quant) => {
    if(quant === 'inc') {
      info.quantity += 1;
    } else {
      info.quantity -= 1;
    }

    fetch("http://localhost:5000/api/books/quantity", {
      method: 'PUT',
      headers: {
        'token': localStorage.getItem('token'),
        'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
       },
       body: JSON.stringify(info) // We send data in JSON format
    })
    .then(res => res.json())
    .then(data => {
      setBooks(data[1]);
    }).catch(err => {
      console.log("Error: " + err);
    });
  }

  const deleteBook = (e, id) => {
    e.preventDefault();
    // /api/books/delete/:id
    fetch(`http://localhost:5000/api/books/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'token': localStorage.getItem('token')
      }
    })
    .then(res => res.json())
    .then(data => {
      setBooks(data[1]);
    }).catch(err => {
      console.log("Error: " + err);
    });
  }


  const handleChange = (e) => {
    if(e.target.value !== '') {
      fetch(`http://localhost:5000/api/books/${e.target.value}`, {
        method: 'GET',
        headers: {
          'token': localStorage.getItem('token')
        }
      })
      .then(res => res.json())
      .then(data => {
        setBooks(data);
      }).catch(err => {
        console.log("Error: " + err);
      });
    } else {
      allBooks();
    }
  }

  return(
    <div>
      <Container fluid>
        <Row>
          <Col className="d-flex flex-wrap">
            {books.map((book, key) => {
              return <Book key={key} info={book} update={updateQuantity} delBook={deleteBook} formSubmit={formSubmit}/>
            })}    
          </Col>
          <Col  xs lg="3">
            <Button className="my-3" variant="outline-info" onClick={handleShow}>Add Book</Button>

            <FormModal show={show} handleClose={handleClose}  func={handleSubmit}/>

            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={(e) => handleChange(e)}/>
            </Form>
            
            <div className="mt-3">
              {stock.map((book, key) => {
                return(
                  <Alert key={key} book={book} />
                );
              })}
            </div>

          </Col>

        </Row>
      </Container>
    </div>
  );
}

export default Inventory;