import react from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';

export class GenreView extends react.Component {
  render () {
    const { Genre, onBackClick } = this.props;

    return (
      <Card>
        <Card.Img crossOrigin="anonymous" variant="top" src={movie.ImagePath} />
        <Card.Header>        
          <Card.Title>{Genre.Name}</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <h4>Name</h4>
            <p>{Genre.Name}</p>
            <h4>Description</h4>
            <p>{Genre.Description}</p>
          </Card.Text>
        </Card.Body>
        <CardFooter>
          <Button onClick={() => { onBackClick() }} variant="link">Back</Button>
        </CardFooter>
      </Card>
    )
  }
}

GenreView.PropTypes = {
  Genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  }).isRequired
};
