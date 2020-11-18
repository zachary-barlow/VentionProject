import React, { useState } from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Collapse from 'react-bootstrap/Collapse';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import EditForm from './EditForm';

function Book({ info, update, delBook, formSubmit }) {
  const [open, setOpen] = useState(false);

  const handleSubmit = (e, data) => {
    setOpen(!open);
    formSubmit(e, data);
  }
  return (
    <div>
      <Card className="inventory-card">
        <Container>
          <Row>
            <Col sm={9}>
              <Card.Body>
                {info.quantity !== 0 ?
                  <Card.Title>{info.title}: ({info.quantity})</Card.Title>
                  :
                  <Card.Title>{info.title}: (<span className="text-danger">Out of Stock</span>)</Card.Title>
                }
                
                <Card.Subtitle className="mb-2 text-muted">Author: {info.author}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">Publisher: {info.publisher}</Card.Subtitle>
                <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
              </Card.Body>
              <Button onClick={() => setOpen(!open)}>Edit</Button>
              <Button className="m-2" variant="outline-danger" onClick={(e) => delBook(e, info.id)}>Delete</Button>
            </Col>
            <Col sm={3}>
              <ButtonGroup size="sm">
                <Button variant="success" onClick={() => update(info, 'inc')}>+</Button>
                {info.quantity > 0 &&
                  <Button variant="danger" onClick={() => update(info, 'dec')}>-</Button>
                }
              </ButtonGroup>
            </Col>
          </Row>
        </Container>

      </Card>

      <Collapse in={open}>
        <Card className="collapse-card">
          <Card.Body>
            <EditForm info={info} func={handleSubmit}/>
          </Card.Body>
        </Card>
      </Collapse>
    </div>
  );
}

export default Book;