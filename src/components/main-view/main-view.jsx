import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

// Import components
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { ProfileView } from '../profile-view/profile-view';
import { DeregistrationView } from '../deregistration-view/deregistration-view';
// import { FavoriteView } from '../favorite-view/favorite-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';

import { Container, Row, Col, Navbar, Nav, Button } from 'react-bootstrap';
import  './main-view.scss';
import logo from '../img/myFlix-logo.jpg';

export class MainView extends React.Component {

  constructor() {
    super();
    // Initial state set to null
    this.state = {
      movies: [],
      users: [],
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
      this.getUsers(accessToken);
      this.getUsers(accessToken);
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

  getUsers(token) {
    axios.get('https://stark-chamber-97082.herokuapp.com/users', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the sate
      this.setState({
        users: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  getUser(token) {
    axios.get('https://stark-chamber-97082.herokuapp.com/users/${Username}', {
      headers: { Authorization: `Bearer ${token} `}
    })
    .then(response => {
      console.log(response.data[0].user);
      this.setState({
        user: response.data[0].user
      });
    })
    .catch(error => {
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


  render() {
    const { users, movies, FavoriteMovies } = this.state;
    const user = localStorage.getItem('user');

    return (
      <Container>      
        {/* <Navbar variant="dark" fixed="top" expand="lg">
          <Container>
            <Navbar.Brand href="/">
              <img
                src={logo}
                width="250"
                height="80"
                className="d-inline-block align-top"
                alt="MyFlix Logo"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href={`/users/${user}`}>{user}'s profile</Nav.Link>
                <Nav.Link href={`/users/${user}/movies`}>{user}'s Favorite Movies</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar> */}

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
                <Col sm={12} md={6} lg={4} xl={3} key={m._id}> 
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

            <Route path="/movies" render={() => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
                /* Before the movies have been loaded*/
              if (movies.length === 0) return <div className="main-view" />
              return movies.map(m => (
                <Col md={3} key={m.Title}>
                  <MovieCard movie={m} />
                </Col>
              ))
            }} />

            <Route path="/movies/:Title" render={({ match, history }) => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
                /* Before the movies have been loaded*/
                if(movies.length === 0) return <div className="main-view" />;
                /* rendering movie list */
                return <Col md={8}>
                <MovieView movie={movies.find(m => m.Title === match.params.Title)} onBackClick={() => history.goBack()} />
                </Col>
            }} />

            <Route path="/users/:Username" render={({ match, history }) => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
                /* Before the users have been loaded*/
              if (users.length === 0) return <div className="main-view" />
              return <Col md={8}>
                  <ProfileView user={users.find(u => u.Username === match.params.Username)} onBackclick={() => history.goBack()} />
                </Col>
            }} />

            <Route path="/users/:Username/update" render={({ history }) => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
                /* Before the users have been loaded*/
              if (users.length === 0) return <div className="main-view" />
              return <Col>
                  <UpdateView onBackclick={() => history.goBack()} />
              </Col>
            }} />

            <Route path="/directors/:Name" render={({ match, history }) => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()}/>
                </Col>
            }} />

            <Route path="/genres/:Name" render={({ match, history }) => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()}/>
                </Col>
            }} />

            <Route path="/users/:Username/deregister" render={({ history }) => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
                /* Before the users have been loaded*/
              if (users.length === 0) return <div className="main-view" />
              return <Col>
                  <DeregisterView onBackclick={() => history.goBack()} />
              </Col>
            }} />

            {/* <Route path="/users/:Username/movies" render={({ match, history }) => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
                // Before the movies have been loaded
              if (FavoriteMovies.length === 0) return <div className="main-view" />
              return FavoriteMovies.map(F => (
                <Col md={3} key={u.FavoriteMovies}>
                  <FavoriteView FavoriteMovies={user.find(u => u.FavoriteMovies === match.params.FavoriteMovies)} onBackclick={() => history.goBack()} />
                </Col>
              ))
            }} /> */}

            {/* <Route path="/profile" render={({ history }) => {
              if (!user) return <Col> 
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
              // before the users have been loaded
              if (users.length === 0) return <div className="main-view" />;
                return <Col md={8}>
                <ProfileView history={history} movies={movies} />
              </Col>
            }} /> */}

          </Row>
        </Router>
      </Container>
  
    );
  }
}

export default MainView;