import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Container, Row, Col, CardGroup, Card, Form, Button } from 'react-bootstrap';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://stark-chamber-97082.herokuapp.com/', {
      /* Send a request to the server for authentication*/
      Username: username,
      Password: password,
    })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('no such user');
      })
  };

  return (
    /* Include CSS Bootstrap for React */
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title>Please Login</Card.Title>
                <Form>
                  <Form.Group>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control 
                      type="text" 
                      value={text}
                      onChange={e => setUsername(e.target.value)} 
                      placeholder="enter eMail"
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control 
                      type="password" 
                      value={password}
                      onChange={e => setPassword(e.target.value)} 
                      placeholder="enter password"
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

  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired
};
