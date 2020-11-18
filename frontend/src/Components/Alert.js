import React, {useState} from 'react';

import Toast from 'react-bootstrap/Toast';

function Alert({ book }) {
  const [show, setShow] = useState(true);
  return(
    <Toast onClose={() => setShow(false)} show={show}>
      <Toast.Header>
        <strong className="mr-auto">{book.author}</strong>
        <strong className="mr-auto">{book.title}</strong>
        <small>Out of Stock</small>
      </Toast.Header>
      <Toast.Body className="text-muted">This book is now out of stock!</Toast.Body>
    </Toast>
  );
}

export default Alert;