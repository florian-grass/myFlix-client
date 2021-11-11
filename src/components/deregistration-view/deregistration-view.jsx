import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card, CardGroup, Navbar, Nav } from 'react-bootstrap';
import axios from 'axios';
// import logo from '../img/myFlix-logo.jpg';


export function DeregistrationView() {
  const user = localStorage.getItem('user');

  const handleSubmit = (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem('token');
    axios.delete(`https://stark-chamber-97082.herokuapp.com/users/${user}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(response => {
        const data = response.data;
        console.log(data);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
          user: null
        })
        window.open("/" , "_self");
        // The second argument "_self" is necessary, so that
        // the page will open in the current page
      })
      .catch(e => {
        console.log('error deregistering the user');
        alert('Something wasn\'t entered right');
      })
  };

  return (    
    <Container>
      <Row className="justify-content-center">
        <Col sm={12} md={10} lg={8} xl={6}>
          <CardGroup>
            <Card>
              <Card.Header>
                <Card.Title>Please Register</Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  Are you sure you want to leave myFlix and close your account?
                </Card.Text>
              </Card.Body>
              <Card.Footer>              
                <Form>
                  <Button variant="danger" type="submit" onClick={handleSubmit}>Delete myFlix Account</Button>
                </Form>
                <Button onClick={() => { onBackClick() }} variant="link"Back></Button>
              </Card.Footer>
            </Card>
          </CardGroup>        
        </Col>
      </Row>
    </Container>
  );
}

