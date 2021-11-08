import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

import './movie-card.scss';

export class MovieCard extends React.Component {

  render() {
    const { movie, onMovieClick } = this.props;

    return (
      <Card>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Header>
          <Card.Title> {movie.Title}</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text>          
            Description: {movie.Description};
            Director: {movie.Director.Name};
            Bio: {movie.Director.Bio};
            Genre: {movie.Genre};
            Description: {movie.Genre.Description}
          </Card.Text>
          <Button onClick={() => onMovieClick(movie)} variant="link">Open</Button>
        </Card.Body>
      </Card>
    );
  }
}



MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
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
  }).isRequired
};




















