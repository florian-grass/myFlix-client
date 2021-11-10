import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Row, Col, CardGroup, Card } from 'react-bootstrap';

export class ProfileView extends React.Component {
  render() {
    const { user, onBackClick} = this.props;

    return(
      <Container>
        <Row>
          <Col>
            <Card.Group>
              <Card>

                <Card.Header>
                  <Card.Title>{user.Username}</Card.Title>
                </Card.Header>

                <Card.Body>
                  <Card.Text>
                    <h5>Email</h5>
                    <p>{user.Email}</p>
                    <h5>birthday</h5>
                    <p>{user.Birthday}</p>
                    <h5>Favorite Movies</h5>
                    <p>{user.FavoriteMovies}</p>
                  </Card.Text>
                </Card.Body>

                <Card.Footer>
                <Link to={`/users/${user.Username}/update`}>
                  <Button variant="link">Update {user.Username}'s Profile</Button>
                </Link>

                <Link to ={`/users/${user.Username}/deregister`}>
                  <Button variant="link">Delete {user.Username}'s Profile</Button>
                </Link>
                <Button onClick={() => { onBackClick() }} variant="link">Back</Button>
                </Card.Footer>

              </Card>
            </Card.Group>
          </Col>
        </Row>
      </Container>
    )
  }
}

ProfileView.PropTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.instanceOf(Date),
    FavoriteMovies: PropTypes.array
  }).isRequired
};