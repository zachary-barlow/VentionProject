import React, { useState } from 'react';

import Form from 'react-bootstrap/Form';

function AddForm({ func }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState(0);
  // const [quantity, setQuantity] = useState(0);


  const handleSubmit = (e) => {
    let data = {
      "title": title,
      "author": author,
      "publisher": publisher,
      "yearPublished": year,
      "price": price,
      // "quantity": parseInt(quantity)
    }

    console.log("hello");
    func(e, data);
  }

  return(
    <Form onSubmit={(event) => handleSubmit(event)}>
      <Form.Group controlId="formGroupTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Title of Book" onChange={(e) => setTitle(e.target.value)}/>
      </Form.Group>

      <Form.Group controlId="formGroupAuthor">
        <Form.Label>Author</Form.Label>
        <Form.Control type="text" placeholder="Author of Book" onChange={(e) => setAuthor(e.target.value)}/>
      </Form.Group>

      <Form.Group controlId="formGroupPublisher">
        <Form.Label>Publisher</Form.Label>
        <Form.Control type="text" placeholder="Publisher of Book" onChange={(e) => setPublisher(e.target.value)}/>
      </Form.Group>

      <Form.Group controlId="formGroupPublished">
        <Form.Label>Published</Form.Label>
        <Form.Control type="text" placeholder="Year the book was published" onChange={(e) => setYear(e.target.value)}/>
      </Form.Group>

      <Form.Group controlId="formGroupPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control type="number" step=".01" placeholder="Price of Book" onChange={(e) => setPrice(e.target.value)}/>
      </Form.Group>

      {/* <Form.Group controlId="formGroupPassword">
        <Form.Label>Quantity</Form.Label>
        <Form.Control type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
      </Form.Group> */}
    </Form>    
  );
}

export default AddForm;