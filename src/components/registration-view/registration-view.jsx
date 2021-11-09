import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CardGroup } from 'react-bootstrap';
import { Form, Button, Container, Row, Col, Card, CardGroup } from 'react-bootstrap';

// import './registration-view.scss';
import axios from 'axios';

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
      <Row>
        <Col>
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
                      onChange={e => setEmail(e.target.value)} placeholder="enter eMail"
                      required 
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control 
                      type="birthday" 
                      value={birthday}
                      onChange={e => setBirthday(e.target.value)} placeholder="enter birthday"
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

RegistrationView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired
};
