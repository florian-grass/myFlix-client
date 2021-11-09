import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

// Import components
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { Container, Row, Col, Navbar } from 'react-bootstrap';
import  './main-view.scss';

export class MainView extends React.Component {

  constructor() {
    super();
    // Initial state set to null
    this.state = {
      movies: [],
      user: null
    };
  }

  componentDidMount(){
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });      
      this.getMovies(accessToken);
    }
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

  /* When a user successfully logs in, this function updates the 'user' property in state to that particular user */
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeitem('user');
    this.setState({
      user: null
    });
  }

  /* When a user successfully signs up, this function updates the user property */
  // onSignedUp(user){
  //   this.setState({
  //     user
  //   });
  // }


  render() {
    const { user, movies } = this.state;

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
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#login">Login</Nav.Link>
                <Nav.Link href="#movies">Movies</Nav.Link>
                <Button className="navbar-button" variant="link" onClick={() => { this.onLoggedOut() }}>Logout</Button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Router>
          <Row className="main-view justify-content-md-center">
            <Route exact path="/" render={() => {
              // rendering login view if there is no user, if yes, passing user details as prop to LoginView
              if (!user) return <Col>
                <LoginView on LoggedIn={user => this.onLoggedIn(user)} />
                </Col>
                /* Before the movies have been loaded*/
                if(movies.length === 0) return <div className="main-view" />
                /* rendering movie list */
                return movies.map(m => (
                <Col md={3} key={m._id}> 
                  <MovieCard movie={m} />
                </Col>
              ))
            }} />
            <Route path="/register" render={() => {
              if (user) return <Redirect to="/" />
              return <Col>
                <RegistrationView />
              </Col>
            }} />

            <Route path="/movies/:movieId" render={({ match, history }) => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
                /* Before the movies have been loaded*/
                if(movies.length === 0) return <div className="main-view" />;
                /* rendering movie list */
                return <Col md={8}>
                <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                </Col>
            }} />

            <Route path="/directors/:name" render={({ match, history }) => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()}/>
                </Col>
            }} />

            <Route path="/genres/:name" render={({ match, history }) => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()}/>
                </Col>
            }} />

            <Route path="/users/:username" render={({ match, history }) => {
              if (!user) return <Col> 
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
              // before the users have been loaded
              if (users.length === 0) return <div className="main-view" />;
                return <Col md={8}>
                <ProfileView user={users.find(u => u.Username === match.params.Username)} onBackclick={() => history.goBack()} />
              </Col>
            }} />
          </Row>
        </Router>
      </Container>
  
    );
  }
}

