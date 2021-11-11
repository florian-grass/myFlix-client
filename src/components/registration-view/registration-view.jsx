import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Container, Row, Col, Card, CardGroup, Navbar, Nav } from 'react-bootstrap';
import axios from 'axios';
import logo from '../img/myFlix-logo.jpg';

import './registration-view.scss';

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://stark-chamber-97082.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
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
              <Nav.Link href="/">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Row className="justify-content-center">
        <Col sm={12} md={10} lg={8} xl={6}>
          <CardGroup>
            <Card>
              <Card.Body>
              <Card.Title>Please Register</Card.Title>
                <Form>
                  <Form.Group>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control 
                      type="text"
                      value={username} 
                      onChange={e => setUsername(e.target.value)} 
                      placeholder="enter eMail" 
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                      type="password"
                      value={password} 
                      onChange={e => setPassword(e.target.value)} 
                      placeholder="enter password"
                      required
                      minLength="8"          
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>eMail address</Form.Label>
                    <Form.Control 
                      type="email" 
                      value={email}
                      onChange={e => setEmail(e.target.value)} 
                      placeholder="enter eMail"
                      required 
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control 
                      type="date" 
                      value={birthday}
                      onChange={e => setBirthday(e.target.value)} 
                      placeholder="enter birthday"
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>        
        </Col>
      </Row>
    </Container>

  );
}

RegistrationView.PropTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.instanceOf(Date)
  }).isRequired
};
