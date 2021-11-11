import React from 'react';
import { Link } from 'react-router-dom';
import {Row, Col, Figure, Button } from 'react-bootstrap';
import axios from 'axios';
import './favorite-view.scss';


function FavoriteMovies({ favoriteMovieList }) {
  const removeFav = (id) => {
    let token = localStorage.getItem('token');
    let url = `https://stark-chamber-97082.herokuapp.com/users/${localStorage.getItem('user')}/movies/${id}`;
    axios.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  return (
    <>
      <Row>
        <Col xs={12}>
          <h4>{user.Username}'s Favorite Movies</h4>
        </Col>
      </Row>
      <Row>
        {favoriteMovieList.map(({ ImagePath, Title}) => {
          return (
            <Col xs={12} md={8} lg={3} key={_id} className="fav-movie"> 
              <Figure>
              <Link to={`/movies/${movies._id}`}>
                <Figure.Image
                  src={movies.ImagePath}
                  alt={movies.Title}
                  />
                <Figure.Caption>                  
                  {Title}
                </Figure.Caption>
              </Link>                
              </Figure>     
              <Button variant="secondary" onClick={() => removeFav(movies._id)} >Remove from List</Button>         
            </Col>
          )
        })}
      </Row>
    </>
  )
}


