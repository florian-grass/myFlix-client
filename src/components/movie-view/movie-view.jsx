import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';

// import './movie.view.scss';


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
        <Card.Img crossOrigin="anonymous" variant="top" src={movie.ImagePath} />
        <Card.Header>        
          <Card.Title>{movie.Title}</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            {movie.Description}
          </Card.Text>
        </Card.Body>
        <CardFooter>
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant="link">Director</Button>
          </Link>

          <Link to ={`/genres/${movie.Genre.Name}`}>
            <Button variant="link">Genre</Button>
          </Link>
          <Button onClick={() => { onBackClick() }} variant="link">Back</Button>
        </CardFooter>
      </Card>
    );
  }
}

MovieView.PropTypes = {
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
  }).isRequired
};
