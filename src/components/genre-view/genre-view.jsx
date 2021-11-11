import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';

export class GenreView extends React.Component {

  render () {
    const { movie, Genre, onBackClick } = this.props;

    return (
      <Card>
        <Card.Header>        
          <Card.Title>{Genre.Name}</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            {Genre.Description}
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
