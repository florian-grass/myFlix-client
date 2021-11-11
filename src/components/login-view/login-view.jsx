import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Container, Row, Col, CardGroup, Card, Form, Button, Navbar, Nav } from 'react-bootstrap';

import './login-view.scss';
import logo from '../img/myFlix-logo.jpg';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // send a request to the server for authentication
    axios.post('https://stark-chamber-97082.herokuapp.com/login', {
      Username: username,
      Password: password,
    })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
        window.open("/" , "_self");
        // The second argument "_self" is necessary, so that
        // the page will open in the current page
      })
      .catch(e => {
        console.log('error registering the user');
        alert('Something wasn\'t entered right');
      })
  };

  return (
    <Container>
      <Navbar variant="dark" fixed="top" expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src={logo}
              width="250"
              height="80"
              className="d-inline-block align-top"
              alt="MyFlix Logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/register">Registration</Nav.Link>
            </Nav>
          </Navbar.Collapse>
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

                    <Button className="primary-button" variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
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

LoginView.PropTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
  }).isRequired
};
