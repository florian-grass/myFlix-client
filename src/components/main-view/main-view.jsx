import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { Container, Row, Col, Navbar } from 'react-bootstrap';
import  './main-view.scss';

export class MainView extends React.Component {

  constructor() {
    super();
    // Initial state set to null
    this.state = {
      movies: [],
      selectedMovie: null, 
      user: null
    };
  }

  getMovies(token) {
    axios.get('https://stark-chamber-97082.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the sate
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  componentDidMount(){
    axios.get('https://stark-chamber-97082.herokuapp.com/movies')
    .then(response => {
      this.state({
        movies: response.data
      });
    })
    .catch(error => {
      console.log(error)
    });
  }

  // When a movie is clicked, this function is invoked and updates the state of the 'selectedMovie' property to that movie
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  /* When a user successfully logs in, this function updates the 'user' property in state to that particular user */
  onLoggedIn(authData){
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  /* When a user successfully signs up, this function updates the user property */
  onSignedUp(user){
    this.setState({
      user
    });
  }


  render() {
    const { user, movies, selectedMovie } = this.state;

    /* If there is no user, the LoginView is rendered. If ther is a user logged in, the user details are passed as a prop to the loginView */
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    /* If the user is not registered, the RegistrationView is rendered, the registration details are passed as a prop to the registrationView */
    if (user) return <RegistrationView onSignedUp={user => this.onSignedUp(user)} />;

    // Before the movies have been loaded
    if (movies.length === 0) return <div className="main-view" />;

    return (
      <Container>
          <Navbar bg="dark" variant="dark" fixed="top">
            <Container>
              <Navbar.Brand href="#home">
                <img
                  src="/logo.svg"
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                  alt="MyFlix Logo"
                />
              </Navbar.Brand>
                <Nav className="me-auto">
                  <Nav.Link href="#home">Home</Nav.Link>
                  <Nav.Link href="#login">Login</Nav.Link>
                  <Nav.Link href="#movies">Movies</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        <Row className="justify-content-md-center main-view">

        {/* If the state of 'selectedMovie' is not null, that selected movie will be returned, otherwise all movies will be returned */}
        {selectedMovie
          ? (            
            <Col md={8}>
              <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
            </Col>
          )

          : movies.map(movie => (
            <Col md={3}>
              <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie); }} />
            </Col>
          ))          
        }
        </Row>
      </Container>
  
    );
  }
}

