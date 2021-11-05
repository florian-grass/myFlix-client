import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';

import './movie.view.scss';


export class MovieView extends React.Component {

  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.keypressCallback);
  }

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Card>
        <Card.Header>
          <Card.Img variant="top" src={movie.ImagePath} />
          <Card.Title>{movie.Title}</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            Description: {movie.Description};
            Director: {movie.Director.Name};
            Bio: {movie.Director.Bio};
            Genre: {movie.Genre};
            Description: {movie.Genre.Description}
          </Card.Text>
          <Button onClick={() => { onBackClick() }} variant="link">Back</Button>
        </Card.Body>
      </Card>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birthday: PropTypes.instanceOf(Date).isRequired,
      Deathday: PropTypes.instanceOf(Date)
    }),
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    })
  }).isRequired,
  onClick: PropTypes.func.isRequired
};