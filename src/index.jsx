import React from 'react';
import ReactDOM from 'react-dom';

// import the MainView component
import MainView from './components/main-view/main-view';
import Container from 'react-bootstrap/Container'

// importstatement to indicate that you need to bundle `./index.scss`
import './index.scss';

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Container className="main-view">
        <MainView />
      </Container>      
    );
  }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);


