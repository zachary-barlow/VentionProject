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
        // 'Access-Control-Allow-Origin' : 'http://localhost:5000/',
        'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
       },
       body: JSON.stringify(data) // We send data in JSON format
    })
    .then(res => res.text())
    .then(dat => {
      if(dat) {
        localStorage.setItem('token', dat);
        setRedirect(true);
      }
    }).catch(err => {
      console.log(err);
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