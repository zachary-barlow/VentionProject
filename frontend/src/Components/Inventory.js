import React, {useEffect, useState} from 'react';

import Book from './Book';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {Button, Form, FormControl} from 'react-bootstrap';

import FormModal from './Modal';


function Inventory() {
  const [show, setShow] = useState(false);
  const [books, setBooks] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/books", {
      method: 'GET',
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

    return () => {
      localStorage.clear();
    }
  }, []);


  // useEffect(() => {
  //   fetch("http://localhost:5000/api/check", {
  //     method: 'GET',
  //     headers: {
  //       'token': localStorage.getItem('token')
  //     }
  //   })
  //   .then(res => res.json())
  //   .then(data => {
  //     console.log(data);
  //   }).catch(err => {
  //     console.log("Error: " + err);
  //   });
  // }, []);


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
    console.log(e);
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
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            </Form>
          </Col>

        </Row>
      </Container>
    </div>
  );
}

export default Inventory;