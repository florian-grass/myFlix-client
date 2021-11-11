import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import axios from 'axios';

import { Link } from 'react-router-dom';

export class MovieCard extends React.Component {

  render() {
    const { movie } = this.props;
    const handleSubmit = (e) => {
      e.preventDefault();
      const accessToken = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      const _id = movie._id;
      axios.post(`https://stark-chamber-97082.herokuapp.com/users/${user}/movies/${_id}` , {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then(response => {
        const data = response.data;
        console.log(data);
      })
      .catch(e => {
        console,log('error adding to favorites')
      });
    };

    return (
      <Card>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Header>
          <Card.Title> {movie.Title} </Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text>{movie.Description}</Card.Text>          
        </Card.Body>
        <Card.Footer>
          <Link to={`/movies/${movie.Title}`}>
            <Button variant="link">Open</Button>
          </Link>
        </Card.Footer>
      </Card>
    );
  }
}



MovieCard.PropTypes = {
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




















