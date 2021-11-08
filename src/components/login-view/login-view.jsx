import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Container, Row, Col, CardGroup, Card, Form, Button } from 'react-bootstrap';

import './registration-view.scss';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://stark-chamber-97082.herokuapp.com/', {
      Username: username,
      Password: password,
    })
      .then(response => {
        const data = response.data;
        console.log(data);
        window.open("/" , "_self");
        // The second argument "_self" is necessary, so that
        // the page will open in the current page
      })
      .catch(e => {
        console.log('error registering the user');
        alert('sSomething wasn\'t entered right');
      })
  };

  return (
    <Container>
      <Navbar bg="dark" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src="/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="MyFlix Logo"
            />
          </Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#login">Login</Nav.Link>
              <Nav.Link href="#movies">Movies</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container>
        <Row className="justify-content-md-center">
          <Col sm={12} md={10} lg={8} xl={6}>
            <CardGroup>
              <Card>
                <Card.Body>
                  <Card.Title>Please Login</Card.Title>
                  <Form>
                    <Form.Group>
                      <Form.Label>Username:</Form.Label>
                      <Form.Control 
                        type="text" 
                        value={username}
                        onChange={e => setUsername(e.target.value)} 
                        placeholder="enter your username"
                        required
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Password:</Form.Label>
                      <Form.Control 
                        type="password" 
                        value={password}
                        onChange={e => setPassword(e.target.value)} 
                        placeholder="enter your password"
                        required
                      />
                    </Form.Group>

                    <Button variant="primary" type="submit"onClick={handleSubmit}>Submit</Button>
                  </Form>
                </Card.Body>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </Container>

  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
  }).isRequired
};
