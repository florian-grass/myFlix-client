import react from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';

export class DirectorView extends react.Component {
  render () {
    const { Director, onBackClick } = this.props;

    return (
      <Card>
        <Card.Img crossOrigin="anonymous" variant="top" src={movie.ImagePath} />
        <Card.Header>        
          <Card.Title>{Director.Name}</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <h4>Bio</h4>
            <p>{Director.Bio}</p>
            <h4>Birthday</h4>
            <p>{Director.Birthday}</p>
          </Card.Text>
        </Card.Body>
        <CardFooter>
          <Button onClick={() => { onBackClick() }} variant="link">Back</Button>
        </CardFooter>
      </Card>
    )
  }
}

DirectorView.PropTypes = {
  Director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birthday: PropTypes.instanceOf(Date).isRequired,
    Deathday: PropTypes.instanceOf(Date),
    Movies: PropTypes.string
  }).isRequired
};
