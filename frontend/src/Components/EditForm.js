import React, { useEffect, useState } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function EditForm({ info, func }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    setTitle(info.title);
    setAuthor(info.author);
    setPublisher(info.publisher);
    setYear(info.yearPublished);
    setPrice(info.price);
    setQuantity(info.quantity);


  }, [info]);


  const handleSubmit = (e) => {
    e.preventDefault();

    let data = {
      "id": info.id,
      "title": title,
      "author": author,
      "publisher": publisher,
      "yearPublished": year,
      "price": price,
      "quantity": parseInt(quantity)
    }

    func(e, data);
  }

  return(
    <Form onSubmit={(event) => handleSubmit(event)}>
      <Form.Group controlId="formGroupTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
      </Form.Group>

      <Form.Group controlId="formGroupAuthor">
        <Form.Label>Author</Form.Label>
        <Form.Control type="text" value={author} onChange={(e) => setAuthor(e.target.value)}/>
      </Form.Group>

      <Form.Group controlId="formGroupPublisher">
        <Form.Label>Publisher</Form.Label>
        <Form.Control type="text" value={publisher} onChange={(e) => setPublisher(e.target.value)}/>
      </Form.Group>

      <Form.Group controlId="formGroupPublished">
        <Form.Label>Published</Form.Label>
        <Form.Control type="text" value={year} onChange={(e) => setYear(e.target.value)}/>
      </Form.Group>

      <Form.Group controlId="formGroupPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control type="number" value={price} step=".01" onChange={(e) => setPrice(e.target.value)}/>
      </Form.Group>

      <Form.Group controlId="formGroupQuantity">
        <Form.Label>Quantity</Form.Label>
        <Form.Control type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
      </Form.Group>

      <Button variant="info" type="submit">Submit</Button>
    </Form>    
  );
}

export default EditForm;