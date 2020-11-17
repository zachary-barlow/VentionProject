import React, {useState} from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import { Redirect } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      "username": username,
      "password": password
    }

    fetch("http://localhost:5000/login", {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
       },
       body: JSON.stringify(data) // We send data in JSON format
    })
    .then(res => res.json())
    .then(dat => {
      if(dat) {
        console.log(dat);
        localStorage.setItem('token', dat.token);
        setRedirect(true);
      }
    }).catch(err => {
      console.log("Error: " + err);
    });
  }

  return(
    <div>
      {!redirect ?
      <Container>
        <Form onSubmit={(event) => handleSubmit(event)}>
          <Form.Group controlId="formGroupUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)}/>
          </Form.Group>

          <Form.Group controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)}/>
          </Form.Group>

          <Button variant="outline-primary" type="submit">Login</Button>
        </Form>
      </Container>
        

        : // redirect is true, user logged in

        <Redirect to="/inv" />
      }

    </div>
  );
}

export default Login;